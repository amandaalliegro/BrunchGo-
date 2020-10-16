restaurant_properties
______________________
id         PRIMARY KEY
owner      VARCHAR(255)
address    VACHAR(255)
phone      INTEGER
open       BOOLEAN DEFAULT false

orders
_____________________
id                  PRIMARY KEY
resturant_id        INTEGER
name                VARCHAR(256)
phone               VARCHAR (256)
order_datetime      TIMESTAMP
sub-total           INTEGER
tax                 INTEGER
total               INTEGER
completed_datetime  TIMESTAMP
status              BOOLEAN DEFAULT false

order_items
___________________
id                  PRIMARY KEY
order_id            INTEGER
item_id             INTEGER
quantity            INTEGER 
specifications      TEXT

items
___________________
id                  PRIMARY KEY 
name                VARCHAR(255) // Title of the dish i.e. 'Pizza'
category            VARCHAR (255) // Beverage, appetizer, entree, etc
price               BIGINT // price per item (cents, BIGINT)
available           BOOLEAN DEFAULT true // in stock or out of stock?
preparation_time    INTEGER // (seconds)
image               VARCHAR(255) // image of the item
stock               


