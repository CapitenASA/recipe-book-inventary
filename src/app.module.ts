import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { UserSubscriber } from './users/subscribers/user.subscriber';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'b',
      entities: ['dist/**/*.entity.js'],
      // subscribers: [UserSubscriber],
      synchronize: true,
    }),
    RecipesModule,
    BooksModule,
    UsersModule,
    AuthModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
