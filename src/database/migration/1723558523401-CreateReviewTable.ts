import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReviewTable1723558523401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reviews',
                columns: [
                    {
                        name: 'review_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_uid',
                        type: 'uuid',
                    },
                    {
                        name: 'movie_id',
                        type: 'int',
                    },
                    {
                        name: 'rating',
                        type: 'int',
                    },
                    {
                        name: 'comment',
                        type: 'text',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_uid'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uid'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['movie_id'],
                        referencedTableName: 'movies',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reviews');
    }

}
