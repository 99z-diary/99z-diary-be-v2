import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getSchedules(cnt: number): Promise<Schedule[]> {
    let schedules;
    if (!cnt) {
      schedules = await this.scheduleRepository.find({
        order: {
          updated: 'DESC',
        },
      });
    } else
      schedules = await this.scheduleRepository.find({
        order: {
          updated: 'DESC',
        },
        take: cnt,
      });
    if (!schedules)
      throw new HttpException('스케줄이 없습니다', HttpStatus.BAD_REQUEST);
    return schedules;
  }
}
