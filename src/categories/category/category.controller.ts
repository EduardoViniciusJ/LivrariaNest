import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { Category } from 'src/db/entities/category.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Endpoint: POST api/category/create
  @Post('create')
  async create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryService.createCategory(categoryDTO);
  }

  // Endpoint: GET api/category
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
