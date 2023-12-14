import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserDto {
  user_id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phone: string;
}
