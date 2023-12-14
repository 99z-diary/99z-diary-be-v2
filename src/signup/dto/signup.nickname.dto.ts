import { IsNotEmpty } from 'class-validator';

export class SignupNicknameDto {
  @IsNotEmpty()
  nickname: string;
}
