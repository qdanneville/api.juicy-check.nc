import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from "./lib/auth/auth"; // Your Better Auth instance
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
