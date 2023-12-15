import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto {
  @ApiProperty({ description: '유저 pk', default: 1 })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: '이름', default: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '닉네임', default: 'nickname' })
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ description: '전화번호(한국)', default: '010-1234-5678' })
  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phone: string;
}
