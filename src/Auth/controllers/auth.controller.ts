import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Injectable, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { signUpDTO } from '../DTOs/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signupHandler(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: signUpDTO,
        @Res() res: Response,
    ) {
        const results = await this.authService.signUpService(body);
        return res.status(201).json({results})
    }
}
