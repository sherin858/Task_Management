import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(userName: string, userEmail: any, userPassword: string): Promise<{
        id: string;
    }>;
    loginUser(userEmail: any, userPassword: string): Promise<string>;
}
