import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepo } from 'src/DB/Repositories/category.repo';
import { CategoryModel } from 'src/DB/Models/category.model';
import { TokenService } from 'src/Common/Services/token.service';
import { UserModel } from 'src/DB/Models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from 'src/DB/Repositories/user.repo';


@Module({
  imports: [CategoryModel, UserModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo, JwtService, TokenService, UserRepo],
})
export class CategoryModule {}