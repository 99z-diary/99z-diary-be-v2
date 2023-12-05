import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  contents: string;

  thumbnail: string;

  images: string[];

  @IsNotEmpty()
  created: Date;

  @IsNotEmpty()
  updated: Date;

  @IsNotEmpty()
  writer: number;

  related_schedule: number[];
}
