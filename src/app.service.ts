import { Injectable } from '@nestjs/common';
import { db } from './lib/db/drizzle';
import { users } from './lib/db/schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<any[]> {
    const usersList = await db.select().from(users).limit(10);
    console.log('usersList', usersList);
    return usersList;
  }
}
