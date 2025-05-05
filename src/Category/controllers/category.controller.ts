import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { AuthGuard } from 'src/Common/Guards/auth.guard';
import { RoleGuard } from 'src/Common/Guards/roles.guard';
import { CategoryService } from '../services/category.service';

@Controller(`/category`)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post(`/create`)
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(['admin'])
    async createCategory(
        @Body('name') name: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const authUser = req['authUser'];
        const results = await this.categoryService.createCategory(name, authUser);
        return res.status(200).json({ results });
    }
}