import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRoles, GenderType } from "src/Common/Types/user.types";

@Schema({
    timestamps: true,
})

export class User {
    @Prop({ required: true, type: String, trim: true, lowercase: true })
    firstName: string;

    @Prop({ required: true, type: String, trim: true, lowercase: true })
    lastName: string;

    @Prop({ required: true, type: String, trim: true, lowercase: true, unique: true })
    email: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: true, type: String, enum: UserRoles, default: UserRoles.USER })
    role: string;

    @Prop({ type: String, enum: GenderType, default: GenderType.MALE })
    gender: string;

    @Prop({ type: String, unique: true })
    phoneNumber: string;

    @Prop({ type: Boolean, default: false })
    emailVerified: boolean;

    @Prop({ type: Date })
    DOB: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
};

const userSchema = SchemaFactory.createForClass(User);
export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: userSchema }]);

export type UserType = HydratedDocument<User>;