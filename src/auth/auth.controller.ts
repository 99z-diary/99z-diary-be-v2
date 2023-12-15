import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '쿠키 인증',
    description:
      '보유하고 있는 accessToken 쿠키 유효 인증(refreshToken 은 현재 동작x)',
  })
  @ApiResponse({
    status: 200,
    description: '쿠키 유효 인증 성공',
    type: Boolean,
  })
  @ApiResponse({ status: 401, description: '유효하지 않은 사용자' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req: Request): any {
    return { ...req.user, password: '' };
  }
}
