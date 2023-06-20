import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface User extends mongoose.Document {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
