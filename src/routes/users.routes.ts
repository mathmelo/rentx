import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';
import { CreateUserController } from '../modules/accounts/useCases/createUsers/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/upadateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();
const upload = multer(multerConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  updateUserAvatarController.handle
);

export { usersRoutes };
