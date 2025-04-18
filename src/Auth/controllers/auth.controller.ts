import { Controller } from '@nestjs/common';
import { Body, Injectable, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signupHandler(@Body() body: object, @Res() res: Response) {
        const results = await this.authService.signUpService(body);
        return res.status(201).json({results})
    }
}
