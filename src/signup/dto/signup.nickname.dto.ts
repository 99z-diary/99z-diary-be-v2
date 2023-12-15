import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupNicknameDto {
  @ApiProperty({ description: '닉네임', default: 'nickname' })
  @IsNotEmpty()
  nickname: string;
}
