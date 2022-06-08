CREATE DATABASE shortly_db


CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
   "createAt" timestamp without time zone NOT NULL DEFAULT NOW()
)

CREATE TABLE shortedUrls (
    id serial PRIMARY KEY,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer REFERENCES users(id),
    views integer NOT NULL,
    "createAt" timestamp without time zone NOT NULL DEFAULT NOW()
)


CREATE TABLE sessions (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    token text NOT NULL,
    "createAt" timestamp without time zone NOT NULL DEFAULT NOW()
)
