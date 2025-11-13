import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryDTO.name },
    });

    if (existingCategory) {
      throw new HttpException(
        'Category with this name already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const category = this.categoryRepository.create(categoryDTO);
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length == 0) {
      throw new HttpException('No categories found.', HttpStatus.NOT_FOUND);
    }
    return categories;
  }
}
