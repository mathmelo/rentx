import { Request, Response } from 'express';

import { ListCategoryService } from './ListCategoryService';

class ListCategoryController {
  constructor(private listCategoryService: ListCategoryService) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryService.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
