import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreatePropertyTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        name: 'fk_properties_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'properties',
      new TableIndex({
        name: 'idx_properties_location',
        columnNames: ['location'],
      })
    );

    await queryRunner.createIndex(
      'properties',
      new TableIndex({
        name: 'idx_properties_price',
        columnNames: ['price'],
      })
    );

    await queryRunner.createIndex(
      'properties',
      new TableIndex({
        name: 'idx_properties_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('properties', 'idx_properties_location');
    await queryRunner.dropIndex('properties', 'idx_properties_price');
    await queryRunner.dropIndex('properties', 'idx_properties_user_id');
    await queryRunner.dropForeignKey('properties', 'fk_properties_user_id');
    await queryRunner.dropTable('properties');
  }
}
