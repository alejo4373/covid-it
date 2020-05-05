CREATE TABLE "boards" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO "boards" ("name") VALUES ('learned'), ('wanttodo'), ('gratefulfor');

ALTER TABLE "notes" ADD COLUMN "board_id" INT REFERENCES "boards" ("id");

UPDATE "notes"
  SET "board_id" = 1 
  WHERE "notes"."category" = 'learned';

UPDATE "notes" 
  SET "board_id" = 2 
  WHERE "notes"."category" = 'wanttodo';

UPDATE "notes" 
  SET "board_id" = 3 
  WHERE "notes"."category" = 'gratefulfor';
  
ALTER TABLE "notes" DROP COLUMN "category";
DROP TYPE "e_note_category";

