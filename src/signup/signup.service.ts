import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { EmailOptions } from './interface/emailoption.interface';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SignupService {
  private transporter: Mail;

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async checkEmailDuplicate(email: string): Promise<boolean> {
    const checkResult = await this.userRepository.checkEmailDuplicate(email);
    if (!checkResult) {
      throw new HttpException('중복된 이메일입니다!!', HttpStatus.BAD_REQUEST);
    } else return checkResult;
  }

  async sendCode(email: string): Promise<boolean> {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    await this.cacheManager.set(email, code);
    const mailOptions: EmailOptions = {
      to: email,
      subject: '이메일 인증 코드',
      html: `인증번호: ${code}`,
    };
    const sendResult = await this.transporter.sendMail(mailOptions);
    if (sendResult.accepted.includes(email)) return true;
    else return false;
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const verifyCode = await this.cacheManager.get(email);
    if (!verifyCode) {
      throw new HttpException(
        '등록된 이메일이 아닙니다!!',
        HttpStatus.NOT_FOUND,
      );
    } else if (verifyCode !== Number(code)) {
      throw new HttpException(
        '잘못된 인증코드입니다!!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.cacheManager.del(email);
      return true;
    }
  }
}
