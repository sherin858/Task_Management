import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { taskSchema } from './task.model';
import { UserModule } from '../user/user.module';
import { TaskGuard } from './guards/task.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }]),
    UserModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskGuard],
})
export class TasksModule {}
