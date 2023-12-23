import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyToTransaction1702550677545
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "trades",
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
    await queryRunner.dropForeignKey("trades", "sell_technical_id");
  }
}
