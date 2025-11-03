import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReviewTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reviews',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'property_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'varchar',
            isNullable: true,
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
      'reviews',
      new TableForeignKey({
        name: 'fk_reviews_property_id',
        columnNames: ['property_id'],
        referencedTableName: 'properties',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'reviews',
      new TableForeignKey({
        name: 'fk_reviews_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'reviews',
      new TableIndex({
        name: 'idx_reviews_property_id',
        columnNames: ['property_id'],
      })
    );

    await queryRunner.createIndex(
      'reviews',
      new TableIndex({
        name: 'idx_reviews_property_id',
        columnNames: ['property_id'],
      })
    );

    await queryRunner.createIndex(
      'reviews',
      new TableIndex({
        name: 'idx_reviews_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'reviews',
      new TableIndex({
        name: 'idx_reviews_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'reviews',
      new TableIndex({
        name: 'idx_reviews_rating',
        columnNames: ['rating'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('reviews', 'idx_reviews_property_id');
    await queryRunner.dropIndex('reviews', 'idx_reviews_user_id');
    await queryRunner.dropIndex('reviews', 'idx_reviews_rating');
    await queryRunner.dropForeignKey('reviews', 'fk_reviews_property_id');
    await queryRunner.dropForeignKey('reviews', 'fk_reviews_user_id');
    await queryRunner.dropTable('reviews');
  }
}
