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
        'Uma ou mais categorias não foram encontradas.',
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

    if (books.length === 0) {
      throw new HttpException('Nenhum livro encontrado.', HttpStatus.NOT_FOUND);
    }

    return books;
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!book) {
      throw new HttpException('Livro não encontrado.', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async deleteBook(id: number): Promise<{ message: string }> {
    const book = await this.getBookById(id);
    await this.bookRepository.remove(book);

    return { message: `Livro '${book.title}' deletado com sucesso.` };
  }

  async updatebook(id: number, bookDTO: BookDTO): Promise<Book> {
    const book = await this.getBookById(id);

    const { categories: categoryIds, ...data } = bookDTO;

    const foundCategories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });

    if (foundCategories.length !== categoryIds.length) {
      throw new HttpException(
        'Uma ou mais categorias não foram encontradas.',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateBook = this.bookRepository.merge(book, {
      ...data,
      categories: foundCategories,
    });

    return this.bookRepository.save(updateBook);
  }
}
