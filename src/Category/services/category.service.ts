import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepo } from '../../DB/Repositories/category.repo';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepo) {}

    async createCategory(name: string, authUser) {
        try {
            const checkCategory = await this.categoryRepo.findOne({ filters: { name } });
            if (checkCategory) throw new ConflictException('Category already exist');
            return await this.categoryRepo.create({ name, addedBy: authUser._id });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}