DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS manager CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE restaurants (
  id         SERIAL PRIMARY KEY NOT NULL,
  owner      VARCHAR(255) NOT NULL,
  address    VARCHAR(255) NOT NULL,
  phone      INTEGER NOT NULL,
  opened     BOOLEAN DEFAULT false
  );

CREATE TABLE orders (
  id                  SERIAL PRIMARY KEY NOT NULL,
  userid              INTEGER NOT NULL,
  restaurant_id        INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name                VARCHAR(255) NOT NULL,
  phone               VARCHAR (255) NOT NULL,
  place_order_datetime      TIMESTAMP NOT NULL,
  sub_total           NUMERIC NOT NULL,
  tax                 NUMERIC NOT NULL,
  total               NUMERIC NOT NULL,
  order_status              VARCHAR(255) NOT NULL,
  accept_order_datetime   TIMESTAMP,
  estimated_prep_time     INTEGER,
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
  quantity            INTEGER NOT NULL
);

CREATE TABLE manager (
  id           SERIAL PRIMARY KEY NOT NULL,
  user_name    VARCHAR(255) NOT NULL,
  password     VARCHAR(255) NOT NULL
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  created TIMESTAMP
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE
);
