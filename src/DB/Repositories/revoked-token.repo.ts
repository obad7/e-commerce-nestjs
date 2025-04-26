import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RevokedToken, RevokedTokenType } from "../Models/revoked-token.model";


@Injectable()
export class RevokedTokenRepo extends BaseRepo<RevokedTokenType> {
    constructor(
        @InjectModel(RevokedToken.name) private readonly revokedTokenModel: Model<RevokedTokenType>,
    ) { 
        super(revokedTokenModel);
    }
}