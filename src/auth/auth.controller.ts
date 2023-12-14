import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(): any {
    return true;
  }
}
