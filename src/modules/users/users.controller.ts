import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create user with an image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/users',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!file) {
      return await this.usersService.addUser(null, createUserDto);
    }
    return await this.usersService.addUser(file.path, createUserDto);
  }

  // Get all users
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  // Get a single user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Update user with an optional profile image
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/users',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.usersService.updateProfileImage(id, file.path);
    } else {
      return await this.usersService.updateUser(id, updateUserDto);
    }
  }

  // Delete a user
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

// Helper function to generate unique file names
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
