import { Injectable } from '@nestjs/common';
import { db } from './lib/db/drizzle';
import { user } from './lib/db/schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<any[]> {
    const usersList = await db.select().from(user).limit(10);
    console.log('usersList', usersList);
    return usersList;
  }
}
