import 'dotenv/config';

import './database';
import './shared/container';

import { App } from './app';

const app = new App().getServer();

app.listen(3333, () => console.log('> Server is running on port 3333'));
