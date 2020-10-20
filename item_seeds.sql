INSERT INTO items (name, category, description, price, available, preparation_time, image)
VALUES
('Breakfast Special', 'Entree', 'Two eggs, two slices of bacon, two sausages and two pieces of toast.', 1195, DEFAULT, 15, 'url'),
('Steak and Eggs', 'Entree', 'Flame grilled steak and served with two eggs, toast and home fries.', DEFAULT, 15, 2400, 'url'),
('Western Omelette', 'Entree', 'Three egg omelette filled with cheese, black forest ham, onions and peppers',1450, DEFAULT, 15, 'url'),
('Eggs Benedict', 'Entree', 'Two English muffins topped with ham, poached eggs and hollandaise sauce. Served with home fries and toast.', 1550, DEFAULT, 15, 'url'),
('Chicken and Waffle', 'Crispy breaded chicken breast served on a Belian waffle with bacon, cheddar cheese, chipotle aioli and maple bacon jam with an over easy egg.', 1575, DEFAULT, 15, 'url'),
('Mozzarella Sticks', 'Appetizer', 'Breaded mozzarella fried golden brown, served with sour cream.', 1350, DEFAULT, 12, 'url' ),
('Chicken Wings', 'Appetizer', 'Tender, juicy wings with carrot sticks. Served with your choice of sauce.',1795, DEFAULT, 15, 'url'),
('Caesar Salad', 'Appetizer', 'Lettuce, cheese, crutons, cabbage, onions, tomatoes, and cucumbers. Served with your choice of dressing.', 799, DEFAULT, 10, 'url'),
('Garden Salad', 'Appetizer', 'Romaine lettuce, crutons, and paraesan cheese. Tossed in a creamy caesar dressing.', 799, DEFAULT, 10, 'url'),
('Cheesecake', 'Dessert', '', 1100, DEFAULT, 8, 'url'),
('Peanut Butter Fudge Cake', 'Dessert', '', 1100, DEFAULT, 8, 'url'),
('Coffee', 'Beverage', 'Fresh brewed coffee.', 299, DEFAULT, 2, 'url'),
('Spring Water', 'Beverage', '500 ml bottle.', 199, DEFAULT, 0, 'url')



--                 VARCHAR(255) // Title of the dish i.e. 'Pizza'
-- category            VARCHAR (255) // Beverage, appetizer, entree, etc
-- price               BIGINT // price per item (cents, BIGINT)
-- available           BOOLEAN DEFAULT true // in stock or out of stock?
-- preparation_time    INTEGER // (seconds)
-- image               VARCHAR(255) // image of the item)
