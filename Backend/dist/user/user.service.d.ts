import { Model } from 'mongoose';
import { User } from './user';
import * as jwt from 'jsonwebtoken';
export declare class UserService {
    private readonly userModel;
    private readonly secretKey;
    constructor(userModel: Model<User>);
    registerUser(name: string, email: string, password: string): Promise<string>;
    findUserByEmail(email: string): Promise<User | undefined>;
    validateUser(email: string, password: string): Promise<string | undefined>;
    generateToken(email: string, password: string): string;
    verifyToken(token: string): string | jwt.JwtPayload;
    isAuthorized(email: string): Promise<any>;
}
