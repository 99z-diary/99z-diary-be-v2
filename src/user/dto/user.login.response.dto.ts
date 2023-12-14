import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserLoginResponseDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phone: string;
}
