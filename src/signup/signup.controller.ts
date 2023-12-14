import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupEmailDto } from './dto/signup.email.dto';
import { SignupNicknameDto } from './dto/signup.nickname.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

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

  @Put('/verifycode')
  async verifyCode(
    @Body() signupEmailDto: SignupEmailDto,
    @Query('code') code: string,
  ): Promise<boolean> {
    return await this.signupService.verifyCode(signupEmailDto.email, code);
  }

  @Post('/nickname')
  async checkNickname(
    @Body() signupNicknameDto: SignupNicknameDto,
  ): Promise<boolean> {
    return await this.signupService.checkNicknameDuplicate(
      signupNicknameDto.nickname,
    );
  }

  @Post()
  async signup(@Body() userDto: UserDto): Promise<boolean> {
    return await this.signupService.signup(userDto);
  }
}
