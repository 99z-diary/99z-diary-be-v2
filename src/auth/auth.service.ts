import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload.interface';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { UserLoginResponseDto } from 'src/user/dto/user.login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAccessToken(email: string, nickname: string): Promise<string> {
    const payload: Payload = { email: email, nickname: nickname };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_JWT_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_EXPIRE_TIME')}`,
    });
    return accessToken;
  }

  async validateAccessToken(payload: Payload): Promise<UserLoginResponseDto> {
    return await this.userRepository.validateTokenByEmail(payload.email);
  }
}
