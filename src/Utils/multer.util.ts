import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import multer, { diskStorage } from "multer";

interface MulterOptions {
    path: string;
    allowedMimeTypes: string[];
}

export const uploadFileOptions = ({path = 'General', allowedMimeTypes}: MulterOptions) => {
    const storage = diskStorage({}); // store in os/temp
    
    const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('Invalid file type'), false);
        }
    };

    return {
        storage,
        fileFilter
    }
}