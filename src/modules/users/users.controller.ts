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
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create user with an image
  @Post('register')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        firstName: {
          type: 'string',
          default: 'Halil',
        },
        lastName: {
          type: 'string',
          default: 'Gayypow',
        },
        email: {
          type: 'string',
          default: 'some@example.com',
        },
        phoneNumber: {
          type: 'string',
          default: '+99361234567',
        },
        password: {
          type: 'string',
          default: '',
        },
        isNotify: {
          type: 'string',
          default: 'true',
        },
      },
    },
  })
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('verifyOtp')
  async verifyOtp(@Request() req) {
    console.log('verifyOtp', req['user']);
    return await this.usersService.verifyOtp(req['user']['id']);
  }
  // Get all users
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  // Get a single user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('login')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        phoneNumber: {
          type: 'string',
          default: '+99361234567',
        },
        password: {
          type: 'string',
          default: '',
        },
      },
    },
  })
  async login(@Body() body: LoginDto) {
    return this.usersService.login(body.phoneNumber, body.password);
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
      return await this.usersService.updateProfileImage(+id, file.path);
    } else {
      return await this.usersService.updateUser(+id, updateUserDto);
    }
  }

  // Delete a user
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}

// Helper function to generate unique file names
export const editFileName = (req, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${file.originalname}`);
};
