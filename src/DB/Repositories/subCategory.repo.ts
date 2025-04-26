import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubCategory, SubCategoryType } from "../Models/subCategory.model";


@Injectable()
export class SubCateoryRepo extends BaseRepo<SubCategoryType> {
    constructor(
        @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategoryType>,
    ) { 
        super(subCategoryModel);
    }
}