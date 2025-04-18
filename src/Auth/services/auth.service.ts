import { Injectable, Body, ConflictException } from '@nestjs/common';
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { Hash } from 'src/Common/Security/hash.security';
import { signUpDTO } from '../DTOs/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepo) {}

    async signUpService(body: signUpDTO) {
        
        const { firstName, lastName, email, password, role } = body;

        const user = await this.userRepo.findByEmail(email);
        if (user) throw new ConflictException('User already exists');

        const hashedPassword = Hash(password);

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
