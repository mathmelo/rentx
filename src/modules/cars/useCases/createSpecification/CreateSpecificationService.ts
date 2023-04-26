import { inject, injectable } from 'tsyringe';

import { HttpException } from '@shared/errors/HttpException';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new HttpException('Specification already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
