import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(userDto: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        name: userDto.name,
        phone: userDto.phone,
      },
    });
    if (!user) {
      throw new HttpException(
        '등록되지 않은 사용자입니다',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
