import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Otp, OtpType } from "../Models/otp.model";


@Injectable()
export class OtpRepo extends BaseRepo<OtpType> {
    constructor(
        @InjectModel(Otp.name) private readonly otpModel: Model<OtpType>,
    ) { 
        super(otpModel);
    }
}