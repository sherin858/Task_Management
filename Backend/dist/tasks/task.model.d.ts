import * as mongoose from 'mongoose';
export declare const taskSchema: mongoose.Schema<any>;
export interface Task extends mongoose.Document {
    id: string;
    title: string;
    status: 'incomplete' | 'complete';
    timeSpent: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    clockIn: Date;
    clockOut: Date;
}
