import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260914144314 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "customer" add column if not exists "internal_note" text null;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "customer" drop column if exists "internal_note";`
    )
  }
}
