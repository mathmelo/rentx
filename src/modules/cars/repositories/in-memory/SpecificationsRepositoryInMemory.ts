import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    await this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specifications.filter((spc) =>
      ids.includes(spc.id)
    );

    return specifications;
  }
}

export { SpecificationRepositoryInMemory };
