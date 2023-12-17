import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupEmailDto } from './dto/signup.email.dto';
import { SignupNicknameDto } from './dto/signup.nickname.dto';
import { UserDto } from 'src/user/dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Signup API')
@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @ApiOperation({
    summary: '이메일 전송',
    description: '중복되지 않은 이메일이라면 인증코드 메일 전송',
  })
  @ApiBody({ type: SignupEmailDto })
  @ApiResponse({ status: 201, description: '중복x, 인증코드 메일 전송' })
  @ApiResponse({ status: 400, description: '중복된 이메일' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('/emailcode')
  async sendCode(@Body() signupEmailDto: SignupEmailDto): Promise<boolean> {
    const code = await this.signupService.checkEmailDuplicate(
      signupEmailDto.email,
    );
    if (code) {
      const result = await this.signupService.sendCode(signupEmailDto.email);
      return result;
    }
  }

  @ApiOperation({
    summary: '인증코드 검증',
    description: '입력환 이메일과 인증코드로 인증',
  })
  @ApiBody({ type: SignupEmailDto })
  @ApiQuery({ name: 'code', description: '인증코드' })
  @ApiResponse({
    status: 200,
    description: '인증코드 인증 성공',
    type: Boolean,
  })
  @ApiResponse({ status: 400, description: '틀린 이메일 or 잘못된 인증코드' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Put('/verifycode')
  async verifyCode(
    @Body() signupEmailDto: SignupEmailDto,
    @Query('code') code: string,
  ): Promise<boolean> {
    return await this.signupService.verifyCode(signupEmailDto.email, code);
  }

  @ApiOperation({
    summary: '닉네임 중복 검사',
    description: '닉네임 중복 검사',
  })
  @ApiBody({ type: SignupNicknameDto })
  @ApiResponse({ status: 201, description: '닉네임 중복x', type: Boolean })
  @ApiResponse({ status: 400, description: '닉네임 중복o' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post('/nickname')
  async checkNickname(
    @Body() signupNicknameDto: SignupNicknameDto,
  ): Promise<boolean> {
    return await this.signupService.checkNicknameDuplicate(
      signupNicknameDto.nickname,
    );
  }

  @ApiOperation({
    summary: '회원가입',
    description: '모든 유효성 검사가 끝나고 최종적으로 정보 등록',
  })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: Boolean })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Post()
  async signup(@Body() userDto: UserDto): Promise<boolean> {
    return await this.signupService.signup(userDto);
  }
}
