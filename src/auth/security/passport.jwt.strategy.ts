import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Payload } from './payload.interface';

const fromAuthCookie = function () {
  return function (request) {
    let token = null;
    if (request && request.cookies) {
      token = request.cookies['accessToken'];
    }
    return token;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: fromAuthCookie(),
      ignoreExpiration: true,
      secretOrKey: configService.get('ACCESS_JWT_SECRET'),
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.authService.validateAccessToken(payload);
    if (!user) {
      return done(
        new HttpException(
          '등록되지 않은 유저입니다!!',
          HttpStatus.UNAUTHORIZED,
        ),
        false,
      );
    } else {
      done(null, user);
    }
  }
}
