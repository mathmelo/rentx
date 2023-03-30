import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionService } from './CreateSessionService';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.execute({ email, password });

    return response.status(200).json(session);
  }
}

export { CreateSessionController };
