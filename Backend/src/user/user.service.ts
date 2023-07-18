import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  private readonly secretKey = 'my-secret-key';
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async registerUser(name: string, email: string, password: string) {
    const newUser = await this.userModel.create({
      name,
      email,
      password,
    });
    return newUser.id as string;
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    let user = this.userModel.findOne({ email }).exec();
    return user;
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    const user = await this.findUserByEmail(email);
    if (user && user.password === password) {
      const token = this.generateToken(email, password);
      return token;
    }
    return undefined;
  }
  generateToken(email: string, password: string): string {
    const token = jwt.sign({ email, password }, this.secretKey);
    return token;
  }
  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }
  async isAuthorized(email: string): Promise<any> {
    let user = await this.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
