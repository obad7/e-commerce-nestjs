import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { User } from "./user.model";
import slugify from "slugify";
import { Category } from "./category.model";

@Schema({
    timestamps: true,
})

export class SubCategory {
    @Prop({
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        index: { name: 'subcategory_name_index', unique: true },
    })
    name: string;

    @Prop({
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        index: { name: 'subcategory_slug_index', unique: true },
        default: function () {
            return slugify(this.name);
        }
    })
    slug: string;

    @Prop({ required: true, type: Types.ObjectId, ref: Category.name })
    categoryId: string | Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    addedBy: string | Types.ObjectId;

    @Prop({ type: Object })
    image: object;

};

const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

export const SubCategoryModel = MongooseModule.forFeature([
    { name: SubCategory.name, schema: SubCategorySchema }
]);

export type SubCategoryType = HydratedDocument<SubCategory> & Document;