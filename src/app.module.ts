
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'mydatabase',
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true
     
    }),
    UserModule,
    PostModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
