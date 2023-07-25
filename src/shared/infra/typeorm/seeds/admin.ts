import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import database from '../index';

const createUserAdmin = async () => {
  const id = uuid();
  const hashPassword = await bcrypt.hash('admin', 8);

  await database.init();

  await database.dataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    values('${id}', 'admin', 'admin@rentx.com', '${hashPassword}', true, 'now()', 'XXXXX')`
  );

  await database.dataSource.destroy();
};

createUserAdmin()
  .then(() => console.log('Admin User has been created!'))
  .catch((err) => console.log('Cannot create an Admin User', err));
