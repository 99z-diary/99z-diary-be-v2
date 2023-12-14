import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserLoginDto } from './dto/user.login.dto';
import { UserLoginResponseDto } from './dto/user.login.response.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UserPasswordDto } from './dto/user.password.dto';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailOptions } from 'src/signup/interface/emailoption.interface';

@Injectable()
export class UserService {
  private transporter: Mail;
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async findUser(userLoginDto: UserLoginDto): Promise<{
    user: UserLoginResponseDto;
    accessToken: string;
    refreshToken: string;
  }> {
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
            user.user_id,
            user.email,
          ),
          refreshToken: await this.authService.createRefreshToken(user.user_id),
        };
        return result;
      }
    }
  }

  async findEmail(name: string, phone: string): Promise<string | boolean> {
    return await this.userRepository.findEmailByNameAndPhone(name, phone);
  }

  async findPassword(userPasswordDto: UserPasswordDto): Promise<boolean> {
    const user =
      await this.userRepository.findUserByEmailAndNameAndPhone(userPasswordDto);
    if (!user) {
      throw new HttpException(
        '등록되지 않은 사용자입니다!!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const tmpPassword = Math.random().toString(36).slice(2);
      const mailOptions: EmailOptions = {
        to: user.email,
        subject: '임시 비밀번호 발급',
        html: `임시 비밀번호: ${tmpPassword}`,
      };
      const sendResult = await this.transporter.sendMail(mailOptions);
      console.log(sendResult);
      if (sendResult.accepted.includes(user.email)) {
        await this.userRepository.changePasswordToTemp(user, tmpPassword);
        return true;
      } else return false;
    }
  }
}
