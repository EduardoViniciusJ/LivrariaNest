import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/db/entities/book.entity';
import { Category } from 'src/db/entities/category.entity';
import { In, Repository } from 'typeorm';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createBook(bookDTO: BookDTO): Promise<Book> {
    const { categories: categoryIds = [], ...data } = bookDTO;

    let categories: Category[] = [];

    if (categoryIds.length) {
      const foundCategories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });

      if (foundCategories.length !== categoryIds.length) {
        throw new HttpException('No category was found.', HttpStatus.NOT_FOUND);
      }

      categories = foundCategories;
    }

    const book = this.bookRepository.create({ ...data, categories });

    return this.bookRepository.save(book);
  }
}
