import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSellTechnicalsTable1702300979806
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sell_technicals",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "sell_signal_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "technical_resources_id",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sell_technicals");
  }
}
