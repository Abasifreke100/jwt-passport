import { DeleteResult, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskEntity: Repository<TaskEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    return await this.taskEntity.findOne({
      where: { id: id },
    });
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.taskEntity.delete(id);
  }

  async updateTask(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.taskEntity.findOne({
      where: { id: id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = status;
    await task.save();

    return task;
  }
}
