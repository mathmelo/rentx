import { Category } from '../../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

/**
 * GET INSTANCE ERROR. Create service está dando erro
 */

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
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
