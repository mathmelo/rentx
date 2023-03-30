import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryService } from './ListCategoryService';

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);
    const categories = await listCategoryService.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
