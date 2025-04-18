import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { UserModel } from 'src/DB/Models/user.model';

@Module({
    imports: [UserModel],
    controllers: [AuthController],
    providers: [AuthService, UserRepo],
})
export class AuthModule {}
