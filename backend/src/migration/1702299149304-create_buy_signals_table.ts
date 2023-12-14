import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateBuySignalsTable1702299149304 implements MigrationInterface {

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
            }),
            true
        );
        // await queryRunner.createForeignKey(
        //     "buy_signals",
        //     new TableForeignKey({
        //         columnNames: ["buy_technical_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "buy_technicals",
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey("buy_signals", "FK_buy_technical");
        await queryRunner.dropTable("buy_signals");
    }
}

