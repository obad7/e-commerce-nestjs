import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Otp, OtpType } from "../Models/otp.model";
import { OtpTypes } from "src/Common/Types/otp.types";
import { Hash } from "src/Common/Security/hash.security";

interface IcreateOtp {
    userId: Types.ObjectId;
    otp: string;
    otpType: OtpTypes;
    expireTime?: Date;
}

@Injectable()
export class OtpRepo extends BaseRepo<OtpType> {
    constructor(
        @InjectModel(Otp.name) private readonly otpModel: Model<OtpType>,
    ) {
        super(otpModel);
    }

    async createOtp ( {userId, otp, otpType, expireTime}: IcreateOtp ) {
        return await this.create({
            userId,
            otp: Hash(otp),
            otpType,
            expireTime: expireTime || new Date(Date.now() + 5 * 60 * 1000),
        });
    }
}