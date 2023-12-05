import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getSchedules(@Query('cnt') cnt: number) {
    return this.scheduleService.getSchedules(cnt);
  }
}
