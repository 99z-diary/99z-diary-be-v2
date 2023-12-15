import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  user_id: number;

  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '이름', default: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '비밀번호', default: '1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '닉네임', default: 'nickname' })
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ description: '전화번호(한국)', default: '010-1234-5678' })
  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phone: string;
}
