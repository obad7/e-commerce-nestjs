import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";
import { UserRoles, GenderType } from "src/Common/Types/user.types";
import { encrypt } from "src/Common/Security/encryption.security";

@Schema({
    timestamps: true,
})

export class User {
    @Prop({ required: true, type: String, trim: true, lowercase: true })
    firstName: string;

    @Prop({ required: true, type: String, trim: true, lowercase: true })
    lastName: string;

    @Prop({
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: { name: 'email_index' },
    })
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

userSchema.pre('save', async function () {
    let changes = this.getChanges()['$set'];

    if (changes.phoneNumber) {
        this.phoneNumber = encrypt(changes.phoneNumber, process.env.ENCRYPT_KEY as string);
    }
})

export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: userSchema }]);

export type UserType = HydratedDocument<User> & Document;