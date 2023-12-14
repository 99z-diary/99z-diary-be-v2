import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user.login.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    const info = await this.userService.findUser(userLoginDto);
    res.setHeader(
      'Authorization',
      'Bearer ' + [info.accessToken, info.refreshToken],
    );
    res.cookie('accessToken', info.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', info.refreshToken, {
      httpOnly: true,
    });
    return res.json(info.user);
  }

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
}
