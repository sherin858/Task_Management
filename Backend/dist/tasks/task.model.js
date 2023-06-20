"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.taskSchema = new mongoose.Schema({
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
}, { timestamps: true });
//# sourceMappingURL=task.model.js.map