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
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = this.categoryRepository.create(categoryDTO);
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length == 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (category == null) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.getCategoryById(id);

    if (category.books && category.books.length > 0) {
      throw new HttpException(
        `Cannot delete category '${category.name}' because it has ${category.books.length} book(s) associated. Remove all books from this category first.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.categoryRepository.remove(category);

    return { message: `Category '${category.name}' deleted successfully.` };
  }

  async updateCategory(
    id: number,
    categoryDTO: CategoryDTO,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);

    if (categoryDTO.name === category.name) {
      return category;
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryDTO.name },
    });

    if (existingCategory) {
      throw new HttpException(
        'Category with this name already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedCategory = this.categoryRepository.merge(category, {
      name: categoryDTO.name,
    });

    return this.categoryRepository.save(updatedCategory);
  }
}
