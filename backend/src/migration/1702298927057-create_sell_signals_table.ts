import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSellSignalsTable1702298927057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sell_signals",
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
            name: "sell_technical_id",
            type: "int",
            isNullable: true,
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
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
    // await queryRunner.createForeignKey(
    //     "sell_signals",
    //     new TableForeignKey({
    //         columnNames: ["sell_technical_id"],
    //         referencedColumnNames: ["id"],
    //         referencedTableName: "sell_technicals",
    //     })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey("sell_signals", "FK_sell_technical");
    await queryRunner.dropTable("sell_signals");
  }
}
