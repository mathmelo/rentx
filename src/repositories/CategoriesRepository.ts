import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
  created_at: Date;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description, created_at }: ICreateCategoryDTO) {
    const category = new Category({
      name,
      description,
      created_at,
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
