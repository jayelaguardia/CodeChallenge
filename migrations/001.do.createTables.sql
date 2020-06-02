CREATE TABLE IF NOT EXISTS "user"(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "contact"(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id) NOT NULL,
  phone_number INT NOT NULL,
  email_address TEXT NOT NULL
);

CREATE TYPE "preferred_contact_method" AS ENUM (
  'email',
  'phone'
);

ALTER TABLE contact 
ADD COLUMN preferred_contact_method preferred_contact_method;