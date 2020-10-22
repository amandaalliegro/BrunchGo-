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

- POST: /new
  - Creates a new order with status "received"

- GET /confirmation 
  - renders the api/orders/pending page according to the status of the order
    - 'received'
    - 'accepted'
    - 'denied'
    - 'completed'

<!-- - GET: /:orderid
  - page with completed order and order summary with all order items
  - Show's the users order id -->

  ### MOUNTED ON /admin

- GET /admin (formerly /manager)
  - check for admin cookie; if admin cookie exists, shows the /admin page with all user orders
  - if no admin cookie, redirect to admin/login

- GET: /admin/login
  - login page

- POST: /admin/login
  - post login info
    - if success: render manages page
    - if fail: login fail

- POST: /admin/orders/accept/:order_id (accept order button)
  - update row on order table
    - order_accepted_timedate
    - order_status: 'accepted'
  - send sms message to customer with expected delivery time

- POST: /admin/orders/deny/:order_id (deny order button)
  - updates row on order table
    -order_status: 'denied'
  
- POST: /admin/orders/complete/:order_id (complete order button)
  - update row on order table 
    - complete_order_datetime
    - order_status
  - send sms message to customer for order is ready

