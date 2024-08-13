import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovieTable1723557464411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movies',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'release_date',
                        type: 'date',
                    },
                    {
                        name: 'genre_id',
                        type: 'int',
                    },
                    {
                        name: 'rating',
                        type: 'decimal',
                        precision: 3,
                        scale: 2,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['genre_id'],
                        referencedTableName: 'genres',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
