import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { HttpException } from '@shared/errors/HttpException';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalService {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<void> {
    // - [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new HttpException('Car is unavailable', 400);
    }

    // - [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new HttpException('There is a rental in progress for user.', 400);
    }

    // - [ ] O aluguel deve ter duração mínima de 24 horas.
  }
}

export { CreateRentalService };
