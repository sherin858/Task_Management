import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TasksService } from '../task.service';
export declare class TaskGuard implements CanActivate {
    private taskService;
    constructor(taskService: TasksService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
