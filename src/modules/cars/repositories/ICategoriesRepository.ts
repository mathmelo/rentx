import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
  created_at: Date;
}

interface ICategoriesRepository {
  create: ({ name, description, created_at }: ICreateCategoryDTO) => void;
  findByName: (name: string) => Category;
  list: () => Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
