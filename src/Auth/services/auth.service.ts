import { Injectable, Body, ConflictException } from '@nestjs/common';
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { Hash } from 'src/Common/Security/hash.security';
import { signUpDTO } from '../DTOs/auth.dto';
import { Events } from 'src/Utils/sendEmail';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepo) {}

    async signUpService(body: signUpDTO) {
        
        const { firstName, lastName, email, password, role } = body;

        const user = await this.userRepo.findByEmail(email);
        if (user) throw new ConflictException('User already exists');

        const hashedPassword = Hash(password);

        // send otp
        const otp = Math.random().toString().slice(2 - 6);
        Events.emit('sendEmail', { 
            to: email,
            subject: 'email verification',
            text: `Your OTP is ${otp}`,
            html: `<h1>Your OTP is ${otp}</h1>`,
         });

        const newUser = await this.userRepo.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        return newUser;
    }
}
