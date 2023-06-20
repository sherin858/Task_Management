import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['incomplete', 'complete'],
      default: 'incomplete',
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
  },
  { timestamps: true },
);

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
