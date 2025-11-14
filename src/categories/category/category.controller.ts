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
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { Category } from 'src/db/entities/category.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  // Endpoint: POST api/category/create
  @Post('create')
  async create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryService.createCategory(categoryDTO);
  }

  // Get all categories
  // Endpoint: GET api/category
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  // Get category by ID
  // Endpoint: GET api/category/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  // Update category by ID
  // Endpoint: PUT api/category/update/:id
  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDTO: CategoryDTO,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, categoryDTO);
  }

  // Delete category by ID
  // Endpoint: DELETE api/category/delete/:id
  @Delete('delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.categoryService.deleteCategory(id);
  }
}
