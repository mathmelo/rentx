import { dataSource } from './data-source';

class Database {
  constructor() {
    this.init();
  }

  init() {
    dataSource
      .initialize()
      .then(() => {
        console.log('> Database has been connected successfully.');
      })
      .catch((err) => {
        console.log(err);

        throw new Error('> Failed to create a connection with database.');
      });
  }
}

export default new Database();
