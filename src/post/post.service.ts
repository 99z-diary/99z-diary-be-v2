import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async getPosts(cnt: number): Promise<Post[]> {
    let posts;
    if (!cnt) {
      posts = await this.postRepository.find({
        order: {
          updated: 'DESC',
        },
      });
    } else
      posts = await this.postRepository.find({
        order: {
          updated: 'DESC',
        },
        take: cnt,
      });
    if (!posts)
      throw new HttpException('게시글이 없습니다', HttpStatus.BAD_REQUEST);
    return posts;
  }
}
