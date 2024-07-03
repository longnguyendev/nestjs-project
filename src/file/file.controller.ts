import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/jpeg') {
          req.fileValidationError = 'unsupported mime type';
          return cb(null, false);
        }
        return cb(null, true);
      },
    }),
  )
  async uploadFile(
    @Req() req,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return await this.fileService.create(file);
  }

  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fileService.findOne(+id);
  }
}
