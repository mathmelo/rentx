import { Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }
}

export { CategoriesRepository };
