import { Body, Controller, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
        const results = await this.categoryService.createCategory(name, authUser);
        return res.status(200).json({ results });
    }
}