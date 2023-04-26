import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAvatarFieldToUsers1680119859119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        type: 'varchar',
        name: 'avatar_path',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar_path');
  }
}
