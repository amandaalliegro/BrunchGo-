INSERT INTO items (id, name, category, price, available, prep_time, image, stock)
VALUES
(1, 'Hamburger', 'Mains', 1500, true, 360, './styles/hamburger.jpeg', 10),
(2, 'Poutine', 'Mains', 1350, true, 360, './styles/poutine.jpeg', 10),
(3, 'Grilled Cheese', 'Mains', 700, true, 360, './styles/grilled_cheese.jpeg', 10),
(4, 'Caprese Eggs Benedict', 'Mains', 1000, true, 600, './styles/benedict.jpeg', 10),
(5, 'Frittata', 'Mains', 1200, true, 720, './styles/fritata.jpeg', 5),
(6, 'Shiitake Bacon & Egg Breakfast Tacos', 'Mains', 1500, true, 600, './styles/tacos.jpeg', 7),

(7, 'Vegan French Toast', 'Appetizers', 500, true, 300, './styles/vegan_french_toast.jpeg', 15),
(8, 'French Fries', 'Appetizers', 1000, true, 360, './styles/french_fries.jpeg', 10),
(9, 'Green Salad', 'Appetizers', 800, true, 360, './styles/green_salad.jpeg', 10),
(10, 'Chips', 'Appetizers', 600, true, 360, './styles/chips.jpeg', 10),
(12, 'Blueberry Feta Flatbread', 'Appetizers', 600, true, 360, './styles/blueberry_fetacheese.jpeg', 10),

(13, 'Cake', 'Desserts', 1500, true, 360, './styles/cake.jpeg', 10),
(14, 'Ice Cream', 'Desserts', 1350, true, 360, './styles/ice_cream.jpeg', 10),
(15, 'Cinnamon Rolls', 'Desserts', 500, true, 200, './styles/cinnamon_roll.jpeg', 20),
(16, 'Banana Pancakes', 'Desserts', 700, true, 500, './styles/banana_pancakes.jpeg', 20),
(17, 'Lemon Cornmeal Pancakes', 'Desserts', 900, true, 500, './styles/lemon_cornmeal.jpeg', 20),

(18, 'Coffee', 'Beverages', 150, true, 60, './styles/coffee.jpeg', 20),
(19, 'Latte', 'Beverages', 150, true, 60, './styles/latte.jpeg', 20),
(20, 'Cappucino', 'Beverages', 200, true, 60, './styles/cappucino.jpeg', 20),
(21, 'Strawberry Banana Smoothie', 'Beverages', 400, true, 300, './styles/smooth.jpeg', 20),
(22, 'Classic Margaritas ', 'Beverages', 700, true, 300, './styles/marguerita.jpeg', 20),
(11, 'Classic Mimosas', 'Beverages', 500, true, 360, './styles/mimosa.jpeg', 10);


INSERT INTO restaurants (id, owner, address, phone, opened)
VALUES
(100, 'Jamie Rolland',  '55 Queens st', 00000000, true),
(200, 'Suzie M.', '289 Joker Boulevard', 00000002, false);

INSERT INTO manager (id, user_name, password)
VALUES
(54321, 'jamie_roll', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO orders (restaurant_id, name, phone, place_order_datetime, sub_total, tax, total)
VALUES(100, 'Erik', '3278424', '1000-01-01 00:00:00', 40, 15, 55);


INSERT INTO order_items (order_id, item_id, quantity, specifications)
VALUES(1, 6, 3, NULL),
(1, 4, 2, NULL),
(1, 5, 5, NULL);
