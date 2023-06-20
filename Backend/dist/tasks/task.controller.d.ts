import { TasksService } from './task.service';
import * as mongoose from 'mongoose';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    addTask(taskTitle: string, taskStatus: 'incomplete' | 'complete', req: any): Promise<{
        id: string;
    }>;
    getTaskByTitle(title: string, req: any): Promise<import("./task.model").Task>;
    getAllTasks(req: any): Promise<{
        id: string;
        title: string;
        status: "complete" | "incomplete";
        timeSpent: number;
        createdBy: mongoose.Types.ObjectId;
    }[]>;
    getTask(taskId: string): Promise<{
        id: any;
        title: any;
        status: any;
        timeSpent: any;
        createdBy: any;
    }>;
    updateTask(taskId: string, taskTitle: string, taskStatus: 'incomplete' | 'complete', taskTimeSpent: number, taskCreatedBy: mongoose.Types.ObjectId): Promise<any>;
    removeTask(taskId: string): Promise<any>;
    clockIn(id: number): Promise<void>;
    clockOut(id: number): Promise<void>;
    calculateTimeSpent(id: string): Promise<{
        timeSpent: number;
    }>;
}
