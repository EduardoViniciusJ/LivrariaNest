import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';
import { Book } from 'src/db/entities/book.entity';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() bookDTO: BookDTO): Promise<Book> {
    return this.bookService.createBook(bookDTO);
  }
}
