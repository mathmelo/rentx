/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response, Express } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import Youch from 'youch';

import './database';
import './shared/container';

import { HttpException } from './errors/HttpException';
import { routes } from './routes';
import swaggerFile from './swagger.json';

export class App {
  private server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  public getServer() {
    return this.server;
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(
      async (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (process.env.NODE_ENV === 'development') {
          const youch = new Youch(err, request);
          const html = await youch.toJSON();

          return response.send(html);
        }

        if (err instanceof HttpException) {
          return response.status(err.statusCode).json({ message: err.message });
        }

        return response.status(500).json({ message: 'Internal server error' });
      }
    );
  }
}
