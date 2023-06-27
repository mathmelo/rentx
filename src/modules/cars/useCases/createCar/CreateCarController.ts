import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarService } from './CreateCarService';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
    } = request.body;

    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
