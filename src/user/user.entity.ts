import { Post } from "src/post/post.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";



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
}