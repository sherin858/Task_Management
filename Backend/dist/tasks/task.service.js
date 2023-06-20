"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TasksService = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    insertTask(title, status, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = new this.taskModel({
                title,
                status,
                createdBy,
            });
            const result = yield newTask.save();
            return result.id;
        });
    }
    getMyTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskModel.find({ createdBy: userId }).exec();
            return tasks.map(task => ({
                id: task.id,
                title: task.title,
                status: task.status,
                timeSpent: task.timeSpent,
                createdBy: task.createdBy,
            }));
        });
    }
    getSingleTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.findTask(taskId);
            return {
                id: task.id,
                title: task.title,
                status: task.status,
                timeSpent: task.timeSpent,
                createdBy: task.createdBy,
            };
        });
    }
    updateTask(taskId, title, status, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTask = yield this.findTask(taskId);
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
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.taskModel.deleteOne({ _id: taskId }).exec();
            if (result.n === 0) {
                throw new common_1.NotFoundException('Could not find task.');
            }
        });
    }
    findTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield this.taskModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException('Could not find task.');
            }
            if (!task) {
                throw new common_1.NotFoundException('Could not find task.');
            }
            return task;
        });
    }
    getByTitle(title, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = yield this.taskModel.findOne({ title });
            if (!task) {
                throw new common_1.NotFoundException('Could not find task.');
            }
            if (task.createdBy == req.user.id)
                return task;
            else
                throw new common_1.UnauthorizedException();
        });
    }
    clockIn(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findOne({ _id: id });
            task.clockIn = new Date();
            yield this.taskModel.updateOne({ _id: id }, task);
        });
    }
    clockOut(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findOne({ _id: id });
            task.clockOut = new Date();
            yield this.taskModel.updateOne({ _id: id }, task);
        });
    }
    calculateTimeSpent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.findTask(id);
            const timeSpent = Math.round((task.clockOut.getTime() - task.clockIn.getTime()) / 1000);
            task.timeSpent = timeSpent;
            yield this.taskModel.updateOne({ _id: id }, task);
            return { timeSpent };
        });
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=task.service.js.map