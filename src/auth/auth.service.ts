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

  async createAccessToken(user_id: number, email: string): Promise<string> {
    const payload: Payload = { user_id: user_id, email: email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_JWT_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_EXPIRE_TIME')}`,
    });
    return accessToken;
  }

  async createRefreshToken(user_id: number): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { user_id: user_id },
      {
        secret: this.configService.get('REFRESH_JWT_SECRET'),
        expiresIn: `${this.configService.get('REFRESH_EXPIRE_TIME')}`,
      },
    );
    return refreshToken;
  }

  async validateAccessToken(payload: Payload): Promise<UserLoginResponseDto> {
    return await this.userRepository.validateTokenByEmail(payload.email);
  }
}
