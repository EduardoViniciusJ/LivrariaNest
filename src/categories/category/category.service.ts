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
    const category = categoryDTO.name.trim(); // Remove espaços em branco

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (existingCategory) {
      throw new HttpException(
        'Já existe uma categoria com esse nome.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCategory = this.categoryRepository.create({ name: category });
    return this.categoryRepository.save(newCategory);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      throw new HttpException(
        'Nenhuma categoria encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!category) {
      throw new HttpException(
        'Categoria não encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.getCategoryById(id);

    if (category.books && category.books.length > 0) {
      throw new HttpException(
        `Não é possível excluir a categoria '${category.name}' porque ela possui ${category.books.length} livro(s) associado(s). Remova os livros dessa categoria primeiro.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.remove(category);

    return { message: `Categoria '${category.name}' deletada com sucesso.` };
  }

  async updateCategory(
    id: number,
    categoryDTO: CategoryDTO,
  ): Promise<Category> {
    const categoryOld = await this.getCategoryById(id);

    const newCategory = categoryDTO.name.trim(); // Remove espaços em branco

    if (newCategory === categoryOld.name) {
      return categoryOld;
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { name: newCategory },
    });

    if (existingCategory) {
      throw new HttpException(
        'Já existe uma categoria com esse nome.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedCategory = this.categoryRepository.merge(categoryOld, {
      name: newCategory,
    });

    return this.categoryRepository.save(updatedCategory);
  }
}
