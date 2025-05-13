import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepo } from '../../DB/Repositories/category.repo';
import { UploadFileService } from '../../Common/Services/cloudinary.service';

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
            }
            
            return await this.categoryRepo.create(category);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}