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
    const { categories: categoryIds, ...data } = bookDTO;

    const foundCategories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });

    if (foundCategories.length !== categoryIds.length) {
      throw new HttpException(
        'One or more categories were not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    const book = this.bookRepository.create({
      ...data,
      categories: foundCategories,
    });

    return this.bookRepository.save(book);
  }

  async getAllBook(): Promise<Book[]> {
    const books = await this.bookRepository.find({
      relations: ['categories'],
    });

    if (books.length == 0) {
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }
    return books;
  }
}
