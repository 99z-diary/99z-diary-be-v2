import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '비밀번호', default: 'abcd1234' })
  @IsNotEmpty()
  password: string;
}
