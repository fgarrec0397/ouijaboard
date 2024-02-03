import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const port = process.env.PORT || "3002";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);

    console.log(`App listening on port: ${port}`);
}

bootstrap();
