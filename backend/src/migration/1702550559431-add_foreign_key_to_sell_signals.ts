import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyToSellSignals1702550559431
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "sell_signals",
      new TableForeignKey({
        columnNames: ["sell_technical_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sell_technicals",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "sell_signals",
      new TableForeignKey({
        columnNames: ["strategy_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "strategies",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("sell_signals", "sell_technical_id");
    await queryRunner.dropForeignKey("sell_signals", "strategy_id");
  }
}
