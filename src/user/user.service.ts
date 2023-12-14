import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserLoginDto } from './dto/user.login.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async findUser(
    userLoginDto: UserLoginDto,
  ): Promise<{ user: UserLoginResponseDto; accessToken: string }> {
    const user = await this.userRepository.findUserByEmail(userLoginDto.email);
    if (user === null) {
      throw new HttpException(
        '등록되지 않은 사용자입니다!!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const check = await bcrypt.compare(userLoginDto.password, user.password);
      if (!check) {
        throw new HttpException(
          '암호가 일치하지 않습니다!!',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const result = {
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            phone: user.phone,
          },
          accessToken: await this.authService.createAccessToken(
            user.email,
            user.nickname,
          ),
        };
        return result;
      }
    }
  }
}
