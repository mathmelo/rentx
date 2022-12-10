import { Router } from 'express';

import { Category } from '../model/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category({ name, description, created_at: new Date() });

  categoriesRepository.create(category);

  return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.status(201).json(categories);
});

export { categoriesRoutes };
