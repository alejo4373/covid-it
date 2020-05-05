CREATE TYPE e_note_category AS ENUM ('learned', 'wanttodo', 'gratefulfor');

ALTER TABLE "notes" ADD column "category" "e_note_category";

UPDATE "notes" SET "category" = 'learned' WHERE "board_id" = 1;
UPDATE "notes" SET "category" = 'wanttodo' WHERE "board_id" = 2;
UPDATE "notes" SET "category" = 'gratefulfor' WHERE "board_id" = 3;

ALTER TABLE "notes" DROP COLUMN "board_id";

DROP TABLE boards;

