import { Injectable } from "@nestjs/common";
import cloudinary from "../Config/cloudinary.config";
import { UploadApiOptions } from "cloudinary";


@Injectable()
export class UploadFileService {
    private cloudinary = cloudinary;

    async uploadFile(file: string, options?: UploadApiOptions ) {
        const data = await this.cloudinary.uploader.upload(file, options);
        return {
            secure_url: data.secure_url,
            public_id: data.public_id
        };
    }

    async uploadMultipleFiles(files: string, options?: UploadApiOptions) {
        const images: object[] = [];
        for (const path of files) {
            const data = await this.cloudinary.uploader.upload(path, options);
            images.push({
                secure_url: data.secure_url,
                public_id: data.public_id
            });
        }
        return images;
    }

    async deleteFile(public_id: string) {
        return await this.cloudinary.uploader.destroy(public_id);
    }

    async deleteFolderByPrefix(prefix: string) {
        await this.cloudinary.api.delete_resources_by_prefix(prefix);
        return await this.cloudinary.api.delete_folder(prefix);
    }
}