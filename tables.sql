

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
    views integer NOT NULL DEFAULT 0,
    "createAt" timestamp without time zone NOT NULL DEFAULT NOW()
)

