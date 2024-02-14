import { Module, OnModuleInit } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import * as admin from "firebase-admin";

import { AuthController } from "./auth.controller";
import { FirebaseAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { FirebaseStrategy } from "./strategies/firebase.strategy";

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [
        AuthService,
        FirebaseStrategy,
        {
            provide: APP_GUARD,
            useClass: FirebaseAuthGuard,
        },
    ],
})
export class AuthModule implements OnModuleInit {
    onModuleInit() {
        const serviceAccount = require("../../../credentials/firebase-serviceAccountKey.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
}
