import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  schedule_id: number;

  @Column()
  schedule_type: number;

  @Column()
  title: string;

  @Column()
  place: string;

  @Column()
  duration: string;

  @Column()
  meet_place: string;

  @Column()
  meet_time: Date;

  @Column({ array: true })
  participants: number;

  @Column()
  created: Date;

  @Column()
  updated: Date;

  @Column()
  scheduler: number;
}
