import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { envs } from '../config/envs';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: envs.CLOUD_NAME,
      api_key:  envs.CLOUD_API_KEY,
      api_secret:  envs.CLOUD_API_SECRET,
    });
  }

  async uploadImage(image: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, (error, result) => {
        if (error) return reject(error);
        resolve(result.url);
      });
    });
  }
}
