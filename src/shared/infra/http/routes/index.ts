import { Router } from 'express';

import { carRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { sessionRoutes } from './session.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/cars', carRoutes);
routes.use('/rentals', rentalRoutes);

export { routes };
