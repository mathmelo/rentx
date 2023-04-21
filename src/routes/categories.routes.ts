import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategories/ListCategoryController';

const categoriesRoutes = Router();
const upload = multer(multerConfig);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

categoriesRoutes.get('/', listCategoryController.handle);

export { categoriesRoutes };
