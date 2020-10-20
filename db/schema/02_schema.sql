DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE restaurants (
  id         SERIAL PRIMARY KEY NOT NULL,
  owner      VARCHAR(255) NOT NULL,
  address    VARCHAR(255) NOT NULL,
  phone      INTEGER NOT NULL,
  opened       BOOLEAN DEFAULT false
);

CREATE TABLE orders (
  id                  SERIAL PRIMARY KEY NOT NULL,
  resturant_id        INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name                VARCHAR(255) NOT NULL,
  phone               VARCHAR (255) NOT NULL,
  place_order_datetime      TIMESTAMP NOT NULL,
  sub_total           INTEGER NOT NULL,
  tax                 INTEGER NOT NULL,
  total               INTEGER NOT NULL,
  accept_order_datetime TIMESTAMP,
  complete_order_datetime  TIMESTAMP
);

CREATE TABLE items (
  id                  SERIAL PRIMARY KEY NOT NULL,
  name                VARCHAR(255) NOT NULL,
  category            VARCHAR(255) NOT NULL,
  price               BIGINT NOT NULL DEFAULT 0,
  available           BOOLEAN DEFAULT true,
  prep_time           INTEGER NOT NULL,
  image               VARCHAR(255) NOT NULL,
  stock               INTEGER NOT NULL DEFAULT 0
);


CREATE TABLE order_items(
  id                  SERIAL PRIMARY KEY NOT NULL,
  order_id            INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  item_id             INTEGER REFERENCES items(id) ON DELETE CASCADE,
  quantity            INTEGER NOT NULL,
  specifications      TEXT
);

CREATE TABLE manager (
  id           SERIAL PRIMARY KEY NOT NULL,
  user_name    VARCHAR(255) NOT NULL,
  password     VARCHAR(255) NOT NULL
);
