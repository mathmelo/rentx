import 'dotenv/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import './database';
import './shared/container';

import { routes } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

app.listen(3333, () => console.log('> Server is running on port 3333'));
