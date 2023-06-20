import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';

import { TasksService } from './task.service';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/models/jwt-auth-guard';
import { TaskGuard } from './guards/task.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async addTask(
    @Body('title') taskTitle: string,
    @Body('status') taskStatus: 'incomplete' | 'complete',
    @Request() req,
  ) {
    const generatedId = await this.tasksService.insertTask(
      taskTitle,
      taskStatus,
      req.user.id,
    );
    return { id: generatedId };
  }

  @Get('search')
  async getTaskByTitle(@Query('title') title: string, @Request() req) {
    let task = await this.tasksService.getByTitle(title, req);
    return task;
  }

  @Get()
  async getAllTasks(@Request() req) {
    let user = req.user;
    const tasks = await this.tasksService.getMyTasks(user.id);
    return tasks;
  }

  @Get(':id')
  @UseGuards(TaskGuard)
  getTask(@Param('id') taskId: string) {
    return this.tasksService.getSingleTask(taskId);
  }

  @Patch(':id')
  @UseGuards(TaskGuard)
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('status') taskStatus: 'incomplete' | 'complete',
    @Body('timespent') taskTimeSpent: number,
    @Body('createdBy') taskCreatedBy: mongoose.Types.ObjectId,
  ) {
    await this.tasksService.updateTask(
      taskId,
      taskTitle,
      taskStatus,
      taskCreatedBy,
    );
    return null;
  }

  @Delete(':id')
  @UseGuards(TaskGuard)
  async removeTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return null;
  }

  @Post('clock-in/:id')
  @UseGuards(TaskGuard)
  async clockIn(@Param('id') id: number): Promise<void> {
    await this.tasksService.clockIn(id);
  }

  @Post('clock-out/:id')
  @UseGuards(TaskGuard)
  async clockOut(@Param('id') id: number): Promise<void> {
    await this.tasksService.clockOut(id);
  }
  @Get('/time-spent/:id')
  @UseGuards(TaskGuard)
  async calculateTimeSpent(@Param('id') id: string) {
    const timeSpent = await this.tasksService.calculateTimeSpent(id);
    return timeSpent;
  }
}
