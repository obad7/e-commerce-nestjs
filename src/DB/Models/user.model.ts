import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "src/Common/Types/user.types";

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
};

const userSchema = SchemaFactory.createForClass(User);
export const UserModel = MongooseModule.forFeature([{ name: 'User', schema: userSchema }]);