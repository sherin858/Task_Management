"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
const jwt_auth_guard_1 = require("./models/jwt-auth-guard");
const jwt_strategy_1 = require("./models/jwt-strategy");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const task_module_1 = require("./tasks/task.module");
const user_module_1 = require("./user/user.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'my-secret-key',
                signOptions: { expiresIn: '1d' },
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/Task'),
            task_module_1.TasksModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [jwt_auth_guard_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy, app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map