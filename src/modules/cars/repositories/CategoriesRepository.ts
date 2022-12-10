import { Category } from '../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description, created_at }: ICreateCategoryDTO): void {
    const category = new Category({
      name,
      description,
      created_at,
    });

    this.categories.push(category);
  }

  findByName(name: string): Category {
    const category = this.categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );

    return category;
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
