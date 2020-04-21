CREATE TYPE e_note_category AS ENUM ('learned', 'wanttodo', 'gratefulfor');

CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "message" VARCHAR,
  "language" VARCHAR,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "category" e_note_category,
  "translation_note" BOOLEAN DEFAULT FALSE,
  "translated_note_note_id" INT,
  "country" VARCHAR,
  "city" VARCHAR
);

ALTER TABLE "notes" ADD FOREIGN KEY ("translated_note_note_id") REFERENCES "notes" ("id");
