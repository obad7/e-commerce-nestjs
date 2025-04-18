import { Injectable, Body, ConflictException } from '@nestjs/common';
import { UserRepo } from 'src/DB/Repositories/user.repo';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepo) {}

    async signUpService(body: object) {

    }
}
