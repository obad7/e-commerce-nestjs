import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document, Types } from "mongoose";
import { User } from "./user.model";
import slugify from "slugify";

@Schema({
    timestamps: true,
})

export class Category {
    @Prop({
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        index: { name: 'category_name_index', unique: true },
    })
    name: string;

    @Prop({
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        index: { name: 'category_slug_index', unique: true },
        default: function () {
            return slugify(this.name);
        }
    })
    slug: string;

    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    addedBy: string | Types.ObjectId;

    @Prop({ type: Object })
    image: object;
};

const categorySchema = SchemaFactory.createForClass(Category);

export const CategoryModel = MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }]);

export type CategoryType = HydratedDocument<Category> & Document;