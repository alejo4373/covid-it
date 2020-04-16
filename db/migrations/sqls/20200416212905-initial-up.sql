CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "message" VARCHAR,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "boards" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR
);

CREATE TABLE "lanes" (
  "id" INT PRIMARY KEY,
  "name" VARCHAR,
  "board_id" INT
);

CREATE TABLE "notes_lanes" (
  "id" SERIAL PRIMARY KEY,
  "lane_id" INT,
  "note_id" INT,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "lanes" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");

ALTER TABLE "notes_lanes" ADD FOREIGN KEY ("lane_id") REFERENCES "lanes" ("id");

ALTER TABLE "notes_lanes" ADD FOREIGN KEY ("note_id") REFERENCES "notes" ("id");
