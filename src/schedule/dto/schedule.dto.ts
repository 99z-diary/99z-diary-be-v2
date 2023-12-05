import { IsNotEmpty } from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty()
  schedule_type: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  place: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  meet_place: string;

  @IsNotEmpty()
  meet_time: Date;

  @IsNotEmpty()
  participants: number[];

  @IsNotEmpty()
  created: Date;

  @IsNotEmpty()
  updated: Date;

  @IsNotEmpty()
  scheduler: number;
}
