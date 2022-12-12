import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryService } from './ListCategoryService';

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoryService = new ListCategoryService(categoriesRepository);
const listCategoryController = new ListCategoryController(listCategoryService);

export { listCategoryController };
