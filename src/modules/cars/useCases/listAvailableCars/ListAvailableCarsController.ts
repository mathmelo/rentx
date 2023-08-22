import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsService } from './ListAvailableCarsService';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, brand, name } = request.query;

    const listCarsService = container.resolve(ListAvailableCarsService);

    const allAvailableCars = await listCarsService.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });

    return response.status(200).json(allAvailableCars);
  }
}

export { ListAvailableCarsController };
