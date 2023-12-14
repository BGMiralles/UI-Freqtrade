import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AddForeignKeyToBuyTecnicals1702550145918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "buy_technicals",
            new TableForeignKey({
                columnNames: ["buy_signal_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "buy_signals",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }
            )
        );

        await queryRunner.createForeignKey(
            "sell_technicals",
            new TableForeignKey({
                columnNames: ["technical_resources_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "technical_resources",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("buy_technicals", "buy_signal_id");
        await queryRunner.dropForeignKey("buy_technicals", "technical_resources_id");
    }

}
