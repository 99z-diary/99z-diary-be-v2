import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupEmailDto {
  @ApiProperty({ description: '이메일', default: 'test@test.com' })
  @IsNotEmpty()
  email: string;
}
