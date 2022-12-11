import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryService } from './ListCategoryService';

const categoriesRepository = new CategoriesRepository();
const listCategoryService = new ListCategoryService(categoriesRepository);
const listCategoryController = new ListCategoryController(listCategoryService);

export { listCategoryController };
