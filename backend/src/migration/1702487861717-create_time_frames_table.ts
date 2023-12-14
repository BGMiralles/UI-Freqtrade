import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTimeFramesTable1702487861717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "time_frames",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "time_frame",
                        type: "varchar",
                        length: "150"
                      }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("time_frames");
    }

}
