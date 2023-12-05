import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(@Query('cnt') cnt: number) {
    return this.postService.getPosts(cnt);
  }
}
