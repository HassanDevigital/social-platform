import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { join } from 'path';

const config: TypeOrmModuleOptions = {
 type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'password',
 database: 'mydatabase',
 entities: [join(__dirname, "**", "*.entity.{ts,js}")],
 synchronize: true, 
 migrations: ['dist/migration/*.js'],
    
};

export default config;
