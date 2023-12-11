import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSellTechnicals1702293428642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sell_technicals",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "sell_signal_id",
                        type: "int",
                      },
                    {
                        name: "technical_resources_id",
                        type: "int",
                      },
                ],
                foreignKeys: [
                    {
                      columnNames: ["sell_signal_id"],
                      referencedTableName: "sell_signal",
                      referencedColumnNames: ["id"],
                    },
                    {
                      columnNames: ["technical_resources_id"],
                      referencedTableName: "technical_resources",
                      referencedColumnNames: ["id"],
                    },
                  ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sell_technicals");
    }

}
