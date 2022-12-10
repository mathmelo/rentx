import { Specification } from '../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreateSpecificationDTO) {
    const specification = new Specification({ description, name });

    this.specifications.push(specification);
  }

  findByName(name: string) {
    return this.specifications.find(
      (specifications) =>
        specifications.name.toLowerCase() === name.toLowerCase()
    );
  }
}

export { SpecificationsRepository };
