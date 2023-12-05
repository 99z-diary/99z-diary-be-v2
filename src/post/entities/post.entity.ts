import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  created: Date;

  @Column()
  updated: Date;

  @Column()
  writer: number;

  @Column({ array: true })
  related_schedule: number;
}
