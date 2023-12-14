import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    const user = await this.findOneBy({ email });
    return user;
  }

  async validateTokenByEmail(email: string): Promise<UserLoginResponseDto> {
    const user = await this.findOneBy({ email });
    return user;
  }
}
