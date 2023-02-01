import { PostgreDataSource } from './data-source';

class Database {
  constructor() {
    this.init();
  }

  init() {
    PostgreDataSource.initialize()
      .then(() => {
        console.log('> PostgreSQL Database has been connected successfully.');
      })
      .catch((err) => {
        console.log(err);

        throw new Error(
          '> Failed to create a connection with PostgreSQL Database.'
        );
      });
  }
}

export default new Database();
