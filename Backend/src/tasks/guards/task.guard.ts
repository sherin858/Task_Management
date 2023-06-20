import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TasksService } from '../task.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private taskService: TasksService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const taskId = context.switchToHttp().getRequest().params.id;
    const userId = context.switchToHttp().getRequest().user.id;
    const task = await this.taskService.taskModel.findById(taskId);
    if (!task) {
      return false;
    }
    return task.createdBy == userId;
  }
}
