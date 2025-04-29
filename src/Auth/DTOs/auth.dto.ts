import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { GenderType, UserRoles } from "src/Common/Types/user.types";


export class SignUpDTO {
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(3, { message: 'First name must be at least 3 characters long' })
    firstName: string;

    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(3, { message: 'Last name must be at least 3 characters long' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserRoles)
    role: string;

    @IsEnum(GenderType)
    gender?: string;

    @IsString()
    phoneNumber?: string;

    @IsDate()
    @Type(() => Date)
    DOB?: Date;
}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    password: string;
}

export class ConfirmEmailDTO {
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'OTP is required' })
    otp: string;
}