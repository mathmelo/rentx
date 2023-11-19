import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalService } from './CreateRentalService';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { userId } = request;

    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      car_id,
      expected_return_date,
      user_id: userId,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
