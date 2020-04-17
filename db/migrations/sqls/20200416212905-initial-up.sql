CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "message" VARCHAR,
  "lane_id" INT,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "lots" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR
);

CREATE TABLE "lanes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "lot_id" INT
);

ALTER TABLE "notes" ADD FOREIGN KEY ("lane_id") REFERENCES "lanes" ("id");
ALTER TABLE "lanes" ADD FOREIGN KEY ("lot_id") REFERENCES "lots" ("id");
