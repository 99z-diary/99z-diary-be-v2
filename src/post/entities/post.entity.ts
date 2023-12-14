import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  contents: string;

  @Column()
  thumbnail: string;

  @Column({ array: true })
  images: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  writer: number;

  @Column({ array: true })
  related_schedule: number;
}
