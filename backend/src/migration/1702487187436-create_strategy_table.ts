import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStrategyTable1702487187436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "strategies",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "150"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "250"
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "buy_signal_id",
                        type: "int",
                    },
                    {
                        name: "sell_signal_id",
                        type: "int",
                    },
                    {
                        name: "time_frame_id",
                        type: "int",
                    },
                    {
                        name: "pair_id",
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
        await queryRunner.dropTable("strategies");
    }

}
