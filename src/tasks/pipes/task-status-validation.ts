import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    console.log(value);
    return value;
  }

  private isStatusValid(status: any) {
    const indexOne = this.allowedStatuses.indexOf(status);
    return indexOne !== -1;
  }
}
