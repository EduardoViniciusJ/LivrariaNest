import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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
  async getAllBook(): Promise<Book[]> {
    return this.bookService.getAllBook();
  }

  // Get book by ID
  // Endpoint: GET api/book/:id
  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  // Update book by ID
  // Endpoint: PUT api/book/update/:id
  @Put('update/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookDTO: BookDTO,
  ): Promise<Book> {
    return this.bookService.updatebook(id, bookDTO);
  }

  // Delete book by ID
  // Endpoint: DELETE api/book/delete/:id
  @Delete('delete/:id')
  async deleteBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.bookService.deleteBook(id);
  }
}
