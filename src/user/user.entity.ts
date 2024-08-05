import { Post } from "src/post/post.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "src/comment/comment.entity";



@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default:true})
    isActive: boolean
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}