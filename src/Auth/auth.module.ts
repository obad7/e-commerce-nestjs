import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { UserModel } from 'src/DB/Models/user.model';
import { TokenService } from 'src/Common/Services/token.service';
import { JwtService } from '@nestjs/jwt';
import { OtpRepo } from 'src/DB/Repositories/otp.repo';
import { OtpModel } from 'src/DB/Models/otp.model';
import { LoggingMiddleware } from 'src/Common/Middlewares/logger.middleware';

@Module({
    imports: [UserModel, OtpModel],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserRepo,
        TokenService,
        JwtService,
        OtpRepo
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes(AuthController);
    }
}
