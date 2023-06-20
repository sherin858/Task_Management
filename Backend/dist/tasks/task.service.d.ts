import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Task } from './task.model';
export declare class TasksService {
    readonly taskModel: Model<Task>;
    constructor(taskModel: Model<Task>);
    insertTask(title: string, status: 'incomplete' | 'complete', createdBy: mongoose.Types.ObjectId): Promise<string>;
    getMyTasks(userId: any): Promise<{
        id: string;
        title: string;
        status: "complete" | "incomplete";
        timeSpent: number;
        createdBy: mongoose.Types.ObjectId;
    }[]>;
    getSingleTask(taskId: string): Promise<{
        id: any;
        title: any;
        status: any;
        timeSpent: any;
        createdBy: any;
    }>;
    updateTask(taskId: string, title: string, status: 'incomplete' | 'complete', createdBy: mongoose.Types.ObjectId): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    private findTask;
    getByTitle(title: string, req: any): Promise<Task>;
    clockIn(id: number): Promise<void>;
    clockOut(id: number): Promise<void>;
    calculateTimeSpent(id: string): Promise<{
        timeSpent: number;
    }>;
}
