INSERT INTO items (id, name, category, price, available, prep_time, image, stock)
VALUES
(1, 'Hamburger', 'Mains', 1500, true, 360, './styles/hamburger.png', 10),
(2, 'Poutine', 'Mains', 1350, true, 360, './styles/poutine.jpeg', 10),
(3, 'Cheese', 'Mains', 700, true, 360, 'url', 10),
(4, 'Caprese Eggs Benedict', Mains, 1000, true, 600, 'url', 10),
(5, 'Frittata', 'Mains', 1200, true, 720, 'url', 5),
(6, 'Shiitake Bacon & Egg Breakfast Tacos', 'Mains', 1500, true, 600, 'url', 7),

(7, 'Vegan French Toast', 'Appetizers', 500, true, 300, 'url', 15),
(8, 'French Fries', 'Appetizers', 1000, true, 360, 'url', 10),
(9, 'Green Salad', 'Appetizers', 800, true, 360, 'url', 10),
(10, 'Chips', 'Appetizers', 600, true, 360, 'url', 10),
(11, 'Classic Mimosas', 'Appetizers', 600, true, 360, 'url', 10),
(12, 'Blueberry Feta Flatbread', 'Appetizers', 600, true, 360, 'url', 10),

(13, 'Cake', 'Desserts', 1500, true, 360, 'url', 10),
(14, 'Ice Cream', 'Desserts', 1350, true, 360, 'url', 10),
(15, 'Cinnamon Rolls', 'Desserts', 500, true, 200, 'url', 20),
(16, 'Banana Pancakes', 'Desserts', 700, true, 500, 'url', 20),
(17, 'Lemon Cornmeal Pancakes', 'Desserts', 900, true, 500, 'url', 20),

(18, 'Coffee', 'Beverages', 150, true, 60, 'url', 20),
(19, 'Latte', 'Beverages', 150, true, 60, 'url', 20),
(20, 'Cappucino', 'Beverages', 200, true, 60, 'url', 20),
(21, 'Strawberry Banana Smoothie', 'Beverages', 400, true, 300, 'url', 20),
(22, 'Classic Margaritas ', 'Beverages', 700, true, 300, 'url', 20);


INSERT INTO restaurants (id, owner, address, phone, opened)
VALUES
(1, 'Jamie Rolland',  '55 Queens st', 00000000, yes),
(2, 'Suzie M.', '289 Joker Boulevard', 00000002, no);



