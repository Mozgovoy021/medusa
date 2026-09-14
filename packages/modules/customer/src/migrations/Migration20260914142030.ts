import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260914142030 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "customer" add column if not exists "note" text null;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "customer" drop column if exists "note";`
    )
  }
}
