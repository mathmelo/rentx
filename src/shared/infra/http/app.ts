/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response, Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import 'express-async-errors';
import Youch from 'youch';

import '@shared/container';

import { HttpException } from '@shared/errors/HttpException';
import { routes } from '@shared/infra/http/routes';
import database from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';

database.init();

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
        err: Error | HttpException,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (process.env.NODE_ENV === 'development') {
          const youch = new Youch(err, request);
          const json = await youch.toJSON();

          return response.send(json);
        }

        if (err instanceof HttpException) {
          return response.status(err.statusCode).json({ message: err.message });
        }

        return response.status(500).json({ message: 'Internal server error' });
      }
    );
  }
}
