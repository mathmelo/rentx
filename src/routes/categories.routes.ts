import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoryController.handle);

export { categoriesRoutes };
