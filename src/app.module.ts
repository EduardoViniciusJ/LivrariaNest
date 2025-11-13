import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database/database.module';
import { BookModule } from './books/book/book.module';

@Module({
  imports: [DatabaseModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
