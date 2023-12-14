import { IsNotEmpty } from 'class-validator';

export class UserPasswordDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;
}
