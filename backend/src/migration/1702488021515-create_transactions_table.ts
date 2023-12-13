import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransactionsTable1702488021515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trades",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "PNL",
                        type: "float",
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["open", "close"],
                        default: "open",
                    },
                    {
                        name: "entry_price",
                        type: "float",
                    },
                    {
                        name: "amount",
                        type: "float",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("trades");
    }

}

