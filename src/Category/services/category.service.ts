import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepo } from '../../DB/Repositories/category.repo';
import { UploadFileService } from '../../Common/Services/cloudinary.service';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepo: CategoryRepo,
        private readonly uploadFileService: UploadFileService,
    ) { }

    async createCategory(name: string, authUser, image) {
        try {
            const checkCategory = await this.categoryRepo.findOne({ filters: { name } });
            if (checkCategory) throw new ConflictException('Category already exist');

            // CATEGORY DATA
            const category = {
                name,
                addedBy: authUser._id 
            };

            // UPLOAD IMAGE
            if (image) {
                const customId = Math.random().toString().slice(2 - 7);
                const uploadImage = await this.uploadFileService.uploadFile(
                    image.path,
                    { folder: `Ecommerce/Category/${customId}` }
                );
                category['image'] = uploadImage;
                category['customId'] = customId;
            }
            
            return await this.categoryRepo.create(category);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async updateCategory(name: string, authUser, categoryId, image) {
        try {
            const category = await this.categoryRepo.findOne({ filters: { _id: categoryId } });
            if (!category) throw new ConflictException('Category not found');

            if (name) {
                const checkCategory = await this.categoryRepo.findOne({ filters: { name } });
                if (checkCategory) throw new ConflictException('Category already exist');
                category.name = name;

                category.slug = slugify(name);
            }

            if (image) {
                // split public id to get old public id and replace with new
                const oldPublicId = category.image['public_id'].split(`${category.customId}/`)[1];
                const data = await this.uploadFileService.uploadFile(
                    image.path,
                    {
                        folder: `Ecommerce/Category/${category.customId}`,
                        public_id: oldPublicId,
                        
                    }
                );
                category.image['secure_url'] = data.secure_url;
            };

            category.updatedBy = authUser._id;
            return await this.categoryRepo.save(category);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async getCategoryById(categoryId) {
        try {
            return await this.categoryRepo.findOne({ filters: { _id: categoryId } });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}