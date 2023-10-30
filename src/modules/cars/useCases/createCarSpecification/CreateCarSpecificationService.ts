// import { inject } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { HttpException } from '@shared/errors/HttpException';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationService {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new HttpException('Car does not exists!');
    }
  }
}

export { CreateCarSpecificationService };
