import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740580059013 implements MigrationInterface {
    name = 'Migration1740580059013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invitation_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "invitation" ("id" SERIAL NOT NULL, "status" "public"."invitation_status_enum" NOT NULL DEFAULT 'pending', "accepted_at" TIMESTAMP, "sent_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "group_id" integer, "user_id" uuid, CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "group_id" integer, "user_id" uuid, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitation" ADD CONSTRAINT "FK_a9c71b02d29a15207172e46d761" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation" ADD CONSTRAINT "FK_dbf801c80100c878509602456ff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_790852db0d7a31e1cd3af00af1e" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_efc766611e939bdbe6f7088984d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_efc766611e939bdbe6f7088984d"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_790852db0d7a31e1cd3af00af1e"`);
        await queryRunner.query(`ALTER TABLE "invitation" DROP CONSTRAINT "FK_dbf801c80100c878509602456ff"`);
        await queryRunner.query(`ALTER TABLE "invitation" DROP CONSTRAINT "FK_a9c71b02d29a15207172e46d761"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "invitation"`);
        await queryRunner.query(`DROP TYPE "public"."invitation_status_enum"`);
    }

}
