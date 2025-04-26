import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { OtpTypes } from "./../../Common/Types/otp.types";
import { User } from "./user.model";

@Schema({
    timestamps: true,
})

export class Otp {
    @Prop({ required: true, type: String })
    otp: string;

    @Prop({ required: true, type: String, enum: OtpTypes })
    otpType: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    userId: string | Types.ObjectId;

    @Prop({ required: true, type: Date })
    expireTime : Date
};

const otpSchema = SchemaFactory.createForClass(Otp);

export const OtpModel = MongooseModule.forFeature([
    { name: Otp.name, schema: otpSchema }
]);

export type OtpType = HydratedDocument<Otp> & Document;