import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryType } from "../Models/category.model";


@Injectable()
export class CateoryRepo extends BaseRepo<CategoryType> {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryType>,
    ) { 
        super(categoryModel);
    }
}