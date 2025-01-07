import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Add a new user with a profile image
  async addUser(image: string | null, body: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.id = uuidv4(); // Generate UUID
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.email = body.email;
      user.phoneNumber = body.phoneNumber;
      user.password = body.password;
      user.profileImage = image;

      return await this.userRepository.save(user);
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to create user');
    }
  }

  // Update a user's data
  async updateUser(id: string, body: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      user.firstName = body.firstName || user.firstName;
      user.lastName = body.lastName || user.lastName;
      user.email = body.email || user.email;
      user.phoneNumber = body.phoneNumber || user.phoneNumber;
      user.password = body.password || user.password;

      await this.userRepository.update(id, user);
      return user;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to update user');
    }
  }

  // Get all users with formatted profile image URLs
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => ({
        ...user,
        profileImage: user.profileImage
          ? `${process.env.BASE_URL}/${user.profileImage}`
          : null,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  // Delete a user by ID
  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to delete user');
    }
  }

  // Update a user's profile image
  async updateProfileImage(id: string, path: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      user.profileImage = path;
      await this.userRepository.update(id, user);
      return user;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to update user profile image');
    }
  }

  // Get a user by ID with formatted profile image URL
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      if (user.profileImage) {
        user.profileImage = `${process.env.BASE_URL}/${user.profileImage}`;
      }

      return user;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve user');
    }
  }
}
