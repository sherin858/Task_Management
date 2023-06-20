import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async registerUser(
    @Body('name') userName: string,
    @Body('email') userEmail,
    @Body('password') userPassword: string,
  ) {
    let userId = await this.userService.registerUser(
      userName,
      userEmail,
      userPassword,
    );
    return { id: userId };
  }

  @Post('login')
  async loginUser(
    @Body('email') userEmail,
    @Body('password') userPassword: string,
  ) {
    return this.userService.validateUser(userEmail, userPassword);
  }
}
