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
const task_service_1 = require("./task.service");
const mongoose = require("mongoose");
const jwt_auth_guard_1 = require("src/models/jwt-auth-guard");
const task_guard_1 = require("./guards/task.guard");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    addTask(taskTitle, taskStatus, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const generatedId = yield this.tasksService.insertTask(taskTitle, taskStatus, req.user.id);
            return { id: generatedId };
        });
    }
    getTaskByTitle(title, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = yield this.tasksService.getByTitle(title, req);
            return task;
        });
    }
    getAllTasks(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            const tasks = yield this.tasksService.getMyTasks(user.id);
            return tasks;
        });
    }
    getTask(taskId) {
        return this.tasksService.getSingleTask(taskId);
    }
    updateTask(taskId, taskTitle, taskStatus, taskTimeSpent, taskCreatedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksService.updateTask(taskId, taskTitle, taskStatus, taskCreatedBy);
            return null;
        });
    }
    removeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksService.deleteTask(taskId);
            return null;
        });
    }
    clockIn(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksService.clockIn(id);
        });
    }
    clockOut(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksService.clockOut(id);
        });
    }
    calculateTimeSpent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeSpent = yield this.tasksService.calculateTimeSpent(id);
            return timeSpent;
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('title')),
    __param(1, common_1.Body('status')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "addTask", null);
__decorate([
    common_1.Get('search'),
    __param(0, common_1.Query('title')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskByTitle", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTask", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('title')),
    __param(2, common_1.Body('status')),
    __param(3, common_1.Body('timespent')),
    __param(4, common_1.Body('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, mongoose.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "removeTask", null);
__decorate([
    common_1.Post('clock-in/:id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "clockIn", null);
__decorate([
    common_1.Post('clock-out/:id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "clockOut", null);
__decorate([
    common_1.Get('/time-spent/:id'),
    common_1.UseGuards(task_guard_1.TaskGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "calculateTimeSpent", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [task_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=task.controller.js.map