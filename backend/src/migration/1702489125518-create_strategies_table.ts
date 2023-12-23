import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStrategiesTable1702489125518 implements MigrationInterface {
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
            length: "150",
          },
          {
            name: "description",
            type: "varchar",
            length: "250",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "buy_signal_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "sell_signal_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "time_frame_id",
            type: "int",
          },
          {
            name: "pair_id",
            type: "int",
            isNullable: true,
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
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["buy_signal_id"],
            referencedTableName: "buy_signals",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["sell_signal_id"],
            referencedTableName: "sell_signals",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["time_frame_id"],
            referencedTableName: "time_frames",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["pair_id"],
            referencedTableName: "pairs",
            referencedColumnNames: ["id"],
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
