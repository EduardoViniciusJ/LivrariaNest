import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database/database.module';
import { BookModule } from './books/book/book.module';
import { CategoryModule } from './categories/category/category.module';

@Module({
  imports: [DatabaseModule, BookModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
