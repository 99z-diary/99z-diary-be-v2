import { Controller, Post, Get, Body, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user.login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserPasswordDto } from './dto/user.password.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user.login.response.dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인 수행',
  })
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({
    status: 201,
    description: '로그인 성공 & 쿠키 발급',
    type: UserLoginResponseDto,
  })
  @ApiResponse({ status: 401, description: '존재하지않는 이메일' })
  @ApiResponse({ status: 401, description: '틀린 비밀번호' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    const info = await this.userService.findUser(userLoginDto);
    res.setHeader('accessToken', info.accessToken);
    res.cookie('accessToken', info.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.setHeader('refreshToken', info.refreshToken);
    res.cookie('refreshToken', info.refreshToken, {
      httpOnly: true,
    });
    return res.json(info.user);
  }

  @ApiOperation({ summary: '로그아웃', description: '쿠키를 보내어 로그아웃' })
  @ApiResponse({ status: 201, description: '로그아웃 성공', type: Boolean })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('/logout')
  async logout(@Res() res: Response): Promise<any> {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
    });
    return res.send(true);
  }

  @ApiOperation({
    summary: '이메일 찾기',
    description: '이름과 전화번호로 이메일 찾기',
  })
  @ApiQuery({
    name: 'name',
    description: '사용자 이름',
  })
  @ApiQuery({
    name: 'phone',
    description: '사용자 전화번호',
  })
  @ApiResponse({ status: 200, description: '이메일 찾기 성공', type: String })
  @ApiResponse({ status: 401, description: '등록되지 않은 유저' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Get('/find/email')
  async findEmail(
    @Query('name') name: string,
    @Query('phone') phone: string,
  ): Promise<string | boolean> {
    return await this.userService.findEmail(name, phone);
  }

  @ApiOperation({
    summary: '비밀번호 찾기',
    description: '이메일, 이름, 전화번호로 비밀번호 찾기',
  })
  @ApiBody({ type: UserPasswordDto })
  @ApiResponse({
    status: 201,
    description: '임시 비밀번호를 담은 메일 전송 성공',
  })
  @ApiResponse({ status: 401, description: '등록되지 않은 유저' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('/find/password')
  async findPassword(
    @Body() userPasswordDto: UserPasswordDto,
  ): Promise<boolean> {
    return await this.userService.findPassword(userPasswordDto);
  }
}
