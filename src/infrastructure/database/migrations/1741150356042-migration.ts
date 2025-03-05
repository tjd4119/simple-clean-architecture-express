import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741150356042 implements MigrationInterface {
  name = 'Migration1741150356042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "supports"`);
    await queryRunner.query(
      `CREATE TYPE "supports"."sales_inquiry_status_enum" AS ENUM('pending', 'resolved')`
    );
    await queryRunner.query(
      `CREATE TABLE "supports"."sales_inquiry" ("sales_inquiry_id" SERIAL NOT NULL, "organization_name" character varying(45) NOT NULL, "contact_name" character varying(45) NOT NULL, "contact_email" character varying(254) NOT NULL, "contact_phone_number" character varying(45) NOT NULL, "data" character varying(500) NOT NULL, "status" "supports"."sales_inquiry_status_enum" NOT NULL DEFAULT 'pending', "inquired_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_851f49d4eec13329655c6bef8e2" PRIMARY KEY ("sales_inquiry_id")); COMMENT ON COLUMN "supports"."sales_inquiry"."sales_inquiry_id" IS 'sales_inquiry_id id'; COMMENT ON COLUMN "supports"."sales_inquiry"."organization_name" IS '기관명'; COMMENT ON COLUMN "supports"."sales_inquiry"."contact_name" IS '담당자 이름'; COMMENT ON COLUMN "supports"."sales_inquiry"."contact_email" IS '담당자 이메일'; COMMENT ON COLUMN "supports"."sales_inquiry"."contact_phone_number" IS '담당자 전화번호'; COMMENT ON COLUMN "supports"."sales_inquiry"."data" IS '도입 문의 데이터'; COMMENT ON COLUMN "supports"."sales_inquiry"."status" IS '도입문의 상태'; COMMENT ON COLUMN "supports"."sales_inquiry"."inquired_at" IS '도입 문의 시점'; COMMENT ON COLUMN "supports"."sales_inquiry"."updated_at" IS '도입문의 상태 변경 시점'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "supports"."sales_inquiry"`);
    await queryRunner.query(`DROP TYPE "supports"."sales_inquiry_status_enum"`);
    await queryRunner.query(`DROP SCHEMA "supports"`);
  }
}
