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
