import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from 'src/db/entities/category.entity';
import { Book } from 'src/db/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
