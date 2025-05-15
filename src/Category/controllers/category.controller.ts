import { AuthController } from './../../Auth/controllers/auth.controller';
import { Body, Controller, Get, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import e, { Request, Response } from 'express';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { AuthGuard } from 'src/Common/Guards/auth.guard';
import { RoleGuard } from 'src/Common/Guards/roles.guard';
import { CategoryService } from '../services/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFileOptions } from 'src/Utils/multer.util';

@Controller(`/category`)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post(`/create`)
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(['admin'])
    @UseInterceptors(
        FileInterceptor(
            'image',
            uploadFileOptions({
                path: 'Category',
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            })
        )
    )
    async createCategory(
        @Body('name') name: string,
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFile() image?: Express.Multer.File
    ) {
        const authUser = req['authUser'];
        const results = await this.categoryService.createCategory(name, authUser, image);
        return res.status(200).json({ results });
    }

    @Patch(`/update/:categoryId`)
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(['admin'])
    @UseInterceptors(
        FileInterceptor(
            'image',
            uploadFileOptions({
                path: 'Category',
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            })
        )
    )
    async updateCategory(
        @Body('name') name: string,
        @Req() req: Request,
        @Res() res: Response,
        @Param('categoryId') categoryId: string,
        @UploadedFile() image?: Express.Multer.File
    ) {
        const authUser = req['authUser'];
        const results = await this.categoryService.updateCategory( name, authUser, categoryId, image );
        return res.status(200).json({ message: 'Category updated successfully', data: results });
    }

    @Get(`/get_category/:categoryId`)
    async getCategoryById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('categoryId') categoryId: string,
    ) {
        const results = await this.categoryService.getCategoryById(categoryId);
        return res.status(200).json({results})
    }
}