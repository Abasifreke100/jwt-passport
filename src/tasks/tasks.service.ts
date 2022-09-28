import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.createTask(createTaskDto);
    if (!task) {
      throw new UnprocessableEntityException();
    }
    return task;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.taskRepository.deleteTask(id);
  }

  async updateTask(id: string, status: TaskStatus): Promise<TaskEntity> {
    return await this.taskRepository.updateTask(id, status);
  }
}
