import { Controller, Get, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Body, Post, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { SignUpDTO, LoginDTO } from '../DTOs/auth.dto';
import { AuthGuard } from 'src/Common/Guards/auth.guard';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { RoleGuard } from 'src/Common/Guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async SignupHandler(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: SignUpDTO,
        @Res() res: Response,
    ) {
        const results = await this.authService.signUpService(body);
        return res.status(201).json({results})
    }

    @Post('login')
    async LoginHandler(
        @Body() body: LoginDTO,
        @Res() res: Response
    ) {
        const results = await this.authService.loginService(body);
        return res.status(200).json({results})
    }

    @Get('profile')
    @Roles(['user', 'admin'])
    @UseGuards(AuthGuard, RoleGuard)
    async ProfileHandler(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const authUser = req['authUser'];
        const results = await this.authService.profileService(authUser);
        return res.status(200).json({results})
    }
}
