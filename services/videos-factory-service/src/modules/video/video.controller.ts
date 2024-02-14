import { Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";

import { Public } from "../auth/decorators/use-public.guard";
import { Script } from "./components/ScriptManager/ScriptManager";
import { ScriptService } from "./services/script.service";
import { TemplateService } from "./services/template.service";
import { VideoService } from "./services/video.service";
import { Template } from "./videoTypes";

const canGenerateScript = true;
const canGenerateTemplate = true;
const canRenderVideo = true;

@Controller("video")
export class VideoController {
    constructor(
        private readonly scriptService: ScriptService,
        private readonly templateService: TemplateService,
        private readonly videoService: VideoService
    ) {}

    @Get()
    @Public()
    async getVideo() {
        return "not authenticated route";
    }

    @Post()
    async createVideo() {
        let script: Script = {};
        let template: Template | undefined = undefined;

        if (canGenerateScript) {
            script = await this.scriptService.generateScript();
        }

        if (canGenerateTemplate) {
            this.templateService.prepareTemplate(script);
            template = await this.templateService.createTemplate();
        }

        try {
            if (!canRenderVideo) {
                return { result: "Video not created" };
            }

            if (template) {
                await this.videoService.generateVideo(template);
            }

            return { result: "Video created" };
        } catch (error) {
            throw new HttpException(error as Record<string, any>, HttpStatus.BAD_REQUEST);
        }
    }
}
