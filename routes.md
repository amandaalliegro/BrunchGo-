## public/routes/menu.js

GET: '/'
- render homepage

GET: '/userid'
- returns the current user's cookie


### MOUNTED ON api/menu/:

- GET: /appetizers
  - Queries the SQL database for all appetizers & related info 
- GET: /mains
  - Queries the SQL database for all mains & related info
- GET: /desserts
  - Queries the SQL database for all desserts & related info

### MOUNTED ON api/orders

- POST: /neworder
  - a new order is created in the SQL databse with an id that is different from the user's cookie 
    - redirect to GET /:orderid

- GET: /:orderid
  - page with completed order and order summary with all order items
  - Show's the users order id


- GET: /admin/login
  - login page

- POST: /admin/login
  - post login info
    - if success: render manages page
    - if fail: login fail

- GET: /admin/orders
  - if not logined, access denind or render index
  - if logged in, render orders 

- POST: /admin/orders/accept/:order_id (accept order button)
  - update row on order table (set order_accepted_timedate)
  - send sms message to customer with expected delivery time

- POST: /admin/orders/completed/:order_id (complete order button)
  - update row on order table (set completed_timedate)
  - send sms message to customer for order is ready
