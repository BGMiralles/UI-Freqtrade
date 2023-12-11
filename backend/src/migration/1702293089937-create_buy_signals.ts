import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBuySignals1702293089937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "buy_signals",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "parameter_1",
                        type: "int",
                    },
                    {
                        name: "parameter_2",
                        type: "int",
                    },
                    {
                        name: "buy_technical_id",
                        type: "int",
                    },
                    {
                        name: "strategy_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",                        
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"                 
                    },
                ],
                foreignKeys: [
                    {
                      columnNames: ["buy_technical_id"],
                      referencedTableName: "buy_technical",
                      referencedColumnNames: ["id"],
                    },
                  ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buy_signals");
    }
}
