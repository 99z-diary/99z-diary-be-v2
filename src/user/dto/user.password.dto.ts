import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordDto {
  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '이름', default: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '전화번호(한국)', default: '010-1234-5678' })
  @IsNotEmpty()
  phone: string;
}
