import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { EncryptService } from '../../tools/encrypt.service';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private encryptService: EncryptService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): any {
    return User;
  }
  async beforeInsert(event: InsertEvent<User>): Promise<any> {
    const { entity } = event;
    try {
      const hashPassword = await this.encryptService.encrypt(entity.password);
      console.log(hashPassword);

      entity.password = hashPassword;
    } catch (error) {
      console.log(error);
    }
  }
}
