import crypto from 'crypto';
import multer from 'multer';
import { resolve, extname } from 'path';

function upload(path: string) {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', 'tmp', 'uploads', `${path}`),
      filename: (request, file, cb) => {
        crypto.randomBytes(16, (err, response) => {
          if (err) return cb(err, file.filename);

          return cb(
            null,
            response.toString('hex') + extname(file.originalname)
          );
        });
      },
    }),
  };
}

export default upload;
