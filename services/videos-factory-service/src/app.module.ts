import { Module } from "@nestjs/common";
import { ConfigModule as EnvConfigModule } from "@nestjs/config";

import { CacheModule } from "./common/cache/cache.module";
import { ConfigModule } from "./config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { SessionSerializer } from "./modules/auth/session.serializer";
import { FilesModule } from "./modules/files/files.module";
import { VideoModule } from "./modules/video/video.module";

@Module({
    imports: [
        EnvConfigModule.forRoot({ isGlobal: true }),
        ConfigModule,
        CacheModule,
        AuthModule,
        VideoModule,
        FilesModule,
    ],
    providers: [SessionSerializer],
})
export class AppModule {}
