import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { UserType, User } from "../Models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UserRepo extends BaseRepo<UserType> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserType>,
    ) { 
        super(userModel);
    }

    async findByEmail(email: string): Promise<UserType | null> {
        return await this.findOne({ filters: { email } });
    }

}