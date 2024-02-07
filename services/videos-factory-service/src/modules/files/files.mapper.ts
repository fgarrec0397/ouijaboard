import { Injectable } from "@nestjs/common";
import AWS from "aws-sdk";
import { InjectStorageConfig, StorageConfig } from "src/config/storage-config.module";

@Injectable()
export class FilesMapper {
    constructor(@InjectStorageConfig() private readonly storageConfig: StorageConfig) {}

    async map(userId: string, callback: StorageConfig["getFiles"] | StorageConfig["getFile"]) {
        const serviceData = await callback(userId);

        if (Array.isArray(serviceData)) {
            return serviceData.map((x) => this.mapFile(x));
        }

        return this.mapFile(serviceData);
    }

    private mapFile(file: AWS.S3.Object) {
        return {
            id: file.Key || "",
            name: this.storageConfig.getFileName(file.Key) || "",
            size: file.Size || 0,
            type: this.storageConfig.getFileExtension(file.Key) || "",
            url: `${this.storageConfig.getBaseUrl()}/${encodeURIComponent(file.Key)}`,
            createdAt: file.LastModified?.toISOString() ?? new Date().toISOString(),
            modifiedAt: file.LastModified?.toISOString() ?? new Date().toISOString(),
        };
    }
}
