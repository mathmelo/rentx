import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUsersDeleteUsername1679149303132
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        type: 'varchar',
        name: 'username',
      })
    );
  }
}
