import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'taskMGT',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
    }),
    TasksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
