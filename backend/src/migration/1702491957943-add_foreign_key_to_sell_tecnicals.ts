import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyToSellTecnicals1702491957943
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "sell_technicals",
      new TableForeignKey({
        columnNames: ["sell_signal_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sell_signals",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "sell_technicals",
      new TableForeignKey({
        columnNames: ["technical_resources_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "technical_resources",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("sell_technicals", "sell_signal_id");
    await queryRunner.dropForeignKey(
      "sell_technicals",
      "technical_resources_id"
    );
  }
}
