import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private userService: UserService
  ) {}

  async createPost(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    console.log('userID',userId)
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user, 
    });

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    //@ts-ignore
    const post = await this.postsRepository.findOne({
      where: { id: id },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.preload({
      id,
      ...updatePostDto,
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return this.postsRepository.save(post);
  }

  async deletePost(id: number): Promise<{ message: string }> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: `Post with ID ${id} deleted successfully` };
  }
}
