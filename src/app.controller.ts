import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/uploads/avatars/:path')
  async getAvatar(@Param('path') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads/avatars/', filename);
    return res.sendFile(filePath);
  }

  @Get('/uploads/images/:path')
  async getImages(@Param('path') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads/images/', filename);
    return res.sendFile(filePath);
  }

  @Get('/uploads/thumbnails/:path')
  async getThumbnails(@Param('path') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads/thumbnails/', filename);
    return res.sendFile(filePath);
  }
}
