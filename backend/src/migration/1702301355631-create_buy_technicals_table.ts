import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBuyTechnicalsTable1702301355631
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "buy_technicals",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "buy_signal_id",
            type: "int",
          },
          {
            name: "technical_resources_id",
            type: "int",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("buy_technicals");
  }
}
