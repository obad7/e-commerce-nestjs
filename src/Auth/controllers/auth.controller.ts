import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { SignUpDTO, LoginDTO } from '../DTOs/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signupHandler(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: SignUpDTO,
        @Res() res: Response,
    ) {
        const results = await this.authService.signUpService(body);
        return res.status(201).json({results})
    }

    @Post('login')
    async loginHandler(
        @Body() body: LoginDTO,
        @Res() res: Response
    ) {
        const results = await this.authService.loginService(body);
        return res.status(200).json({results})
    }
}
