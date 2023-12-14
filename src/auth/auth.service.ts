import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createAccessToken(email: string, nickname: string): Promise<string> {
    const payload: Payload = { email: email, nickname: nickname };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_JWT_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_EXPIRE_TIME')}`,
    });
    return accessToken;
  }
}
