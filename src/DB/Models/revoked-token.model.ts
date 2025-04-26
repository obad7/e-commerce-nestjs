import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { User } from "./user.model";

@Schema({
    timestamps: true,
})

export class RevokedToken {
    @Prop({ required: true, type: String })
        
    @Prop({ required: true, type: String })
    token: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    userId: string | Types.ObjectId;

    @Prop({ required: true, type: Date })
    expireTime : Date
};

const revokedTokenSchema = SchemaFactory.createForClass(RevokedToken);
export const RevokedTokenModel = MongooseModule.forFeature([
    { name: RevokedToken.name, schema: revokedTokenSchema }
]);
export type RevokedTokenType = HydratedDocument<RevokedToken> & Document;