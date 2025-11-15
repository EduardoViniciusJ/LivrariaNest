import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';
import { Book } from 'src/db/entities/book.entity';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Create a new book
  // Endpoint: POST api/book/create
  @Post('create')
  async create(@Body() bookDTO: BookDTO): Promise<Book> {
    return this.bookService.createBook(bookDTO);
  }

  // Get all books
  // Endpoint: GET api/book
  @Get()
  async getAllBook(): Promise<Book[]>{
    return this.bookService.getAllBook();
  }
}
