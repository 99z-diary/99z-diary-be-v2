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
    res.setHeader('Authorization', '99zdiary' + info.accessToken);
    return res.json(info.user);
  }
}
