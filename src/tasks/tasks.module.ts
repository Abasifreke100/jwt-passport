import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskTransformer } from './transformers/task.transformer';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, TaskTransformer],
})
export class TasksModule {}
