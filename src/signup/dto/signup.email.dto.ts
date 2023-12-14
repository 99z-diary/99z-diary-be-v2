import { IsNotEmpty } from 'class-validator';

export class SignupEmailDto {
  @IsNotEmpty()
  email: string;
}
