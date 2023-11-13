import type { Request, Response } from 'express';

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.status(201).send();
  }
}

export { UploadCarImageController };
