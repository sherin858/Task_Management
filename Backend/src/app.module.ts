import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './models/jwt-auth-guard';
import { JwtStrategy } from './models/jwt-strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/task.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Task'),
    TasksModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [JwtAuthGuard, JwtStrategy, AppService],
})
export class AppModule {}
