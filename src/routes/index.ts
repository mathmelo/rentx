import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { categoriesRoutes } from './categories.routes';
import { sessionRoutes } from './session.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/users', usersRoutes);

routes.use(ensureAuthenticated);

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export { routes };
