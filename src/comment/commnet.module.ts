import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Post } from '../post/post.entity';
import { PostService } from '../post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  providers: [CommentService, UserService, PostService],
  controllers: [CommentController],
})
export class CommentModule {}
