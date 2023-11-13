import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesService } from './UploadCarImagesService';

interface IFileName {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFileName[];

    const uploadCarImagesService = container.resolve(UploadCarImagesService);

    const images_name = images.map((i) => i.filename);

    uploadCarImagesService.execute({ car_id: id, images_name });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
