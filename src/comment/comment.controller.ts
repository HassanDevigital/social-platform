import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':postId')
  findAllByPost(@Param('postId') postId: number) {
    return this.commentService.findAllByPost(postId);
  }
}
