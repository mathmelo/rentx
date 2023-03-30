/* eslint-disable no-useless-return */
import { stat, unlink } from 'node:fs/promises';

export const deleteFile = async (file_path: string) => {
  try {
    await stat(file_path);
    await unlink(file_path);
  } catch {
    return;
  }
};
