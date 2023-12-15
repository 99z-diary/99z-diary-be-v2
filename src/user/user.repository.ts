import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';
import { UserPasswordDto } from './dto/user.password.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {
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

  async checkEmailDuplicate(email: string): Promise<boolean> {
    const duplicate = await this.findOneBy({ email });
    return !duplicate;
  }

  async checkNicknameDuplicate(nickname: string): Promise<boolean> {
    const duplicate = await this.findOneBy({ nickname });
    return !duplicate;
  }

  async findEmailByNameAndPhone(
    name: string,
    phone: string,
  ): Promise<string | boolean> {
    const targetEmail = await this.findOneBy({ name, phone });
    console.log(targetEmail);
    return !targetEmail ? false : targetEmail.email;
  }

  async findUserByEmailAndNameAndPhone(
    userPasswordDto: UserPasswordDto,
  ): Promise<UserDto> {
    return await this.findOneBy({
      email: userPasswordDto.email,
      name: userPasswordDto.name,
      phone: userPasswordDto.phone,
    });
  }

  async changePasswordToTemp(
    user: UserDto,
    tmpPassword: string,
  ): Promise<void> {
    user.password = await bcrypt.hash(
      tmpPassword,
      Number(this.configService.get('BCRYPT_HASH_KEY')),
    );
    await this.save(user);
  }
}
