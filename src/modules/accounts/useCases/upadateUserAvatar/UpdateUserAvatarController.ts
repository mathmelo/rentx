import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from './UpdateUserAvatarService';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file, userId } = request;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute(file.filename, userId);

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
