import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { TaskTransformer } from './transformers/task.transformer';
import { BaseController } from '../base.controller';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task.status.enum';

@Controller('tasks')
export class TasksController extends BaseController {
  constructor(
    private tasksService: TasksService,
    private taskTransformer: TaskTransformer,
  ) {
    super();
  }

  // @Get()
  // async getTasks(
  //   @Query(ValidationPipe) filterDto: FilterDto,
  // ): Promise<TaskEntity[]> {
  //   return await this.tasksService.getTasks(filterDto);
  // }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);
    return await this.transform(task, this.taskTransformer);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() requestData: CreateTaskDto) {
    return await this.tasksService.createTask(requestData);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    const task = await this.tasksService.updateTask(id, status);
    return await this.transform(task, this.taskTransformer);
  }
}
