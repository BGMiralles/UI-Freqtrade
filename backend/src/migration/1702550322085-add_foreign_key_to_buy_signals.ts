import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AddForeignKeyToBuySignals1702550322085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "buy_signals",
            new TableForeignKey({
                columnNames: ["buy_technical_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "buy_technicals",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }
            )
        );

        await queryRunner.createForeignKey(
            "buy_signals",
            new TableForeignKey({
                columnNames: ["strategy_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "strategies",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("buy_signals", "buy_technical_id");
        await queryRunner.dropForeignKey("buy_signals", "strategy_id");
    }

}
