import { MigrationInterface, QueryRunner } from "typeorm";
import config from "../../../config";
import { UserEntity } from "../entities/user.entity";
import { ContactEntity } from "../entities/contact.entity";
import { CompanyEntity } from "../entities/company.entity";
import { ECompanyType } from "../../../enums";
import { ContractEntity } from "../entities/contract.entity";
import bcrypt from "bcrypt";

export class AddedTablesAndData1740947024342 implements MigrationInterface {
  name = "AddedTablesAndData1740947024342";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" text, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "last_name" character varying(64), "first_name" character varying(64), "patronymic" character varying(64), "phone" character varying(30), "email" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" text NOT NULL, "file_path" text NOT NULL, "thumb_path" text, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contracts" ("no" uuid NOT NULL DEFAULT uuid_generate_v4(), "issue_date" TIMESTAMP, "company_id" integer NOT NULL, CONSTRAINT "REL_d5800fabd9afe7bbb166183879" UNIQUE ("company_id"), CONSTRAINT "PK_20938c22be8d48dadade77edaaa" PRIMARY KEY ("no"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."companies_type_enum" AS ENUM('agent', 'contractor')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."companies_status_enum" AS ENUM('active', 'inactive')`
    );
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" text, "short_name" character varying(256), "business_entity" character varying(64), "address" text, "type" "public"."companies_type_enum" array NOT NULL, "status" "public"."companies_status_enum" NOT NULL DEFAULT 'active', "contact_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "companies_photos_files" ("company_id" integer NOT NULL, "file_id" integer NOT NULL, CONSTRAINT "PK_85b050fc5074ba94c4921dfa7f7" PRIMARY KEY ("company_id", "file_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01484eadf010db44913c883fd8" ON "companies_photos_files" ("company_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ff986db3774ae7675b139e12f" ON "companies_photos_files" ("file_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_d5800fabd9afe7bbb166183879e" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_779b773150527a59b1493af4dfc" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "companies_photos_files" ADD CONSTRAINT "FK_01484eadf010db44913c883fd80" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "companies_photos_files" ADD CONSTRAINT "FK_8ff986db3774ae7675b139e12f4" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );

    // create data for dev/test
    if (config.env.dev || config.env.test) {
      const hashedPassword1 = await bcrypt.hash("adminadmin", 10);
      const hashedPassword2 = await bcrypt.hash("useruser", 10);
      const users: Partial<UserEntity>[] = [
        {
          full_name: "Rick Grimes",
          email: "admin@example.com",
          password: hashedPassword1,
        },
        {
          full_name: "Alex Nolan",
          email: "user@example.com",
          password: hashedPassword2,
        },
      ];

      const userRepository = queryRunner.manager.getRepository(UserEntity);
      await userRepository.insert(users);

      const contacts: Partial<ContactEntity>[] = [
        {
          lastName: "Григорьев",
          firstName: "Сергей",
          patronymic: "Петрович",
          phone: "79162165588",
          email: "grigoriev@funeral.com",
        },
        {
          lastName: "Никитин",
          firstName: "Добрыня",
          patronymic: "Алесандрович",
          phone: "12345678910",
          email: "test@example.com",
        },
      ];

      const contactRepository =
        queryRunner.manager.getRepository(ContactEntity);
      const newContacts = await contactRepository.insert(contacts);

      if (newContacts.identifiers.length !== 2) {
        throw new Error("Migration went wrong");
      }

      const companies: Partial<CompanyEntity>[] = [
        {
          contactId: newContacts.identifiers[0].id,
          name: "ООО Фирма «Перспективные захоронения»",
          shortName: "Перспективные захоронения",
          businessEntity: "ООО",
          type: [ECompanyType.AGENT, ECompanyType.CONTRACTOR],
          address: "Minsk, Belarus"
        },
        {
          contactId: newContacts.identifiers[1].id,
          name: "ООО «ТАКТИЛ»",
          shortName: "ТАКТИЛ",
          businessEntity: "ООО",
          type: [ECompanyType.AGENT],
        },
      ];

      const companyRepository =
        queryRunner.manager.getRepository(CompanyEntity);
      const newCompanies = await companyRepository.insert(companies);

      if (newCompanies.identifiers.length !== 2) {
        throw new Error("Migration went wrong");
      }

      const contracts: Partial<ContractEntity>[] = [
        {
          company_id: newCompanies.identifiers[0].id,
          issue_date: new Date(),
        },
        {
          company_id: newCompanies.identifiers[1].id,
          issue_date: new Date(),
        },
      ];

      const contractRepository =
        queryRunner.manager.getRepository(ContractEntity);
      await contractRepository.insert(contracts);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies_photos_files" DROP CONSTRAINT "FK_8ff986db3774ae7675b139e12f4"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies_photos_files" DROP CONSTRAINT "FK_01484eadf010db44913c883fd80"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "FK_779b773150527a59b1493af4dfc"`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP CONSTRAINT "FK_d5800fabd9afe7bbb166183879e"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ff986db3774ae7675b139e12f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01484eadf010db44913c883fd8"`
    );
    await queryRunner.query(`DROP TABLE "companies_photos_files"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TYPE "public"."companies_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."companies_type_enum"`);
    await queryRunner.query(`DROP TABLE "contracts"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
