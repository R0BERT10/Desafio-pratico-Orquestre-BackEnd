import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1723165293956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "uid",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                        length: "100"
                    },
                    {
                        name: "user_name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                        length: "100"
                    },
                    {
                        name: "full_name",
                        type: "varchar",
                        isNullable: false,
                        length: "100"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()"
                    },
                    {
                        name: "last_login_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
