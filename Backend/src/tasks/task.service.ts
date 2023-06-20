import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') public readonly taskModel: Model<Task>) {}

  async insertTask(
    title: string,
    status: 'incomplete' | 'complete',
    createdBy: mongoose.Types.ObjectId,
  ) {
    const newTask = new this.taskModel({
      title,
      status,
      createdBy,
    });
    const result = await newTask.save();
    return result.id as string;
  }

  async getMyTasks(userId) {
    const tasks = await this.taskModel.find({ createdBy: userId }).exec();
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      timeSpent: task.timeSpent,
      createdBy: task.createdBy,
    }));
  }

  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId);
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      timeSpent: task.timeSpent,
      createdBy: task.createdBy,
    };
  }

  async updateTask(
    taskId: string,
    title: string,
    status: 'incomplete' | 'complete',
    createdBy: mongoose.Types.ObjectId,
  ) {
    const updatedTask = await this.findTask(taskId);
    if (title) {
      updatedTask.title = title;
    }
    if (status) {
      updatedTask.status = status;
    }
    if (createdBy) {
      updatedTask.createdBy = createdBy;
    }
    updatedTask.save();
  }

  async deleteTask(taskId: string) {
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find task.');
    }
  }

  private async findTask(id: string) {
    let task;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task.');
    }
    if (!task) {
      throw new NotFoundException('Could not find task.');
    }
    return task;
  }

  async getByTitle(title: string, req) {
    let task = await this.taskModel.findOne({ title });
    if (!task) {
      throw new NotFoundException('Could not find task.');
    }
    if (task.createdBy == req.user.id) return task;
    else throw new UnauthorizedException();
  }
  async clockIn(id: number) {
    const task = await this.taskModel.findOne({ _id: id });
    task.clockIn = new Date();
    await this.taskModel.updateOne({ _id: id }, task);
  }

  async clockOut(id: number) {
    const task = await this.taskModel.findOne({ _id: id });
    task.clockOut = new Date();
    task.status = 'complete';
    await this.taskModel.updateOne({ _id: id }, task);
    this.calculateTimeSpent(`${id}`);
  }

  async calculateTimeSpent(id: string) {
    const task = await this.findTask(id);
    const timeSpent = Math.round(
      (task.clockOut.getTime() - task.clockIn.getTime()) / 1000,
    );
    task.timeSpent = timeSpent;
    await this.taskModel.updateOne({ _id: id }, task);
    return { timeSpent };
  }
}
