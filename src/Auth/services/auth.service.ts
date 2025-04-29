import { TokenService } from './../../Common/Services/token.service';
import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { Hash, compareHash } from 'src/Common/Security/hash.security';
import { ConfirmEmailDTO, LoginDTO, SignUpDTO } from '../DTOs/auth.dto';
import { Events } from 'src/Utils/sendEmail';
import { UserType } from 'src/DB/Models/user.model';
import { OtpRepo } from 'src/DB/Repositories/otp.repo';
import { OtpTypes } from 'src/Common/Types/otp.types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly tokenService: TokenService,
        private readonly otpRepo : OtpRepo,
    ) { }

    async signUpService(body: SignUpDTO) {
        const { firstName, lastName, email, password, role, phoneNumber, DOB, gender } = body;

        const user = await this.userRepo.findByEmail(email);
        if (user) throw new ConflictException('User already exists');

        const hashedPassword = Hash(password);

        // send otp
        const otp = Math.random().toString().slice(2 - 6);
        
        
        const newUser = await this.userRepo.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
            DOB,
            gender
        });
        
        Events.emit('sendEmail', { 
            to: email,
            subject: 'email verification',
            text: `Your OTP is ${otp}`,
            html: `<h1>Your OTP is ${otp}</h1>`,
        });
        
        await this.otpRepo.createOtp({
            userId: newUser._id,
            otp,
            otpType: OtpTypes.CONFIRMATION
        });

        return newUser;
    }

    async confirmEmailService(body: ConfirmEmailDTO) {
        try {
            const { email, otp } = body;

            const user = await this.userRepo.findByEmail(email);
            if (!user) throw new NotFoundException('User not found');

            const returnedOtp = await this.otpRepo.findOne({
                filters: {
                    userId: user._id,
                    otpType: OtpTypes.CONFIRMATION
                }
            });
            if (!returnedOtp) throw new NotFoundException('Otp not found');

            if (!compareHash(otp, returnedOtp.otp)) {
                throw new BadRequestException('In-valid otp');
            }

            if (returnedOtp.expireTime < new Date()) {
                throw new BadRequestException('Otp expired');
            }

            await this.otpRepo.deleteOne({ _id: returnedOtp._id });

            user.emailVerified = true;
            await this.userRepo.save(user);
            
            return {'message': 'Email confirmed'};
        } catch (error) {
            throw new Error(`Email confirmation failed: ${error.message}`);
        }
    }

    async loginService(body: LoginDTO) {
        try {
            const { email, password } = body;

            const user = await this.userRepo.findByEmail(email);
            if (!user || !compareHash(password, user.password)) {
                throw new ConflictException('In-valid credentials');
            }

            // generate token
            const accessToken = this.tokenService.generateToken(
                {
                    id: user._id,
                    email: user.email,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1d',
                }
            );

            return {accessToken};
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async profileService(authUser: UserType) {
        try {
            return await this.userRepo.findByEmail(authUser.email);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
