import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const {  parentCommentId } = createCommentDto;
    const user = await this.userService.findOne(createCommentDto.userId);
    const post = await this.postService.findOne(createCommentDto.postId);
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      post,
      parentComment: parentCommentId ? { id: parentCommentId } : null,
    });
    return this.commentRepository.save(comment);
  }
// function createComment
  async findAllByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'post', 'parentComment', 'replies'],
    });
  }
  }



