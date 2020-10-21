const order =  [ { id: '7',
name: 'Vegan French Toast',
category: 'Appetizers',
price: '500',
available: 'true',
prep_time: '300',
image: './styles/vegan_french_toast.jpeg',
stock: '15',
quantity: '1' },
{ id: '8',
name: 'French Fries',
category: 'Appetizers',
price: '1000',
available: 'true',
prep_time: '360',
image: './styles/french_fries.jpeg',
stock: '10',
quantity: '1' } ];

const order_id = 1;
const orderLength = order.length;
let count = 0;
let queryString = 'INSERT INTO order_items (order_id, item_id, quantity) VALUES ';
for (let item of order) {
  queryString += `(${order_id}, ${item.id}, ${item.quantity}) `;
  if (count < orderLength - 1) {
    queryString += ', ';
  }
  count++;
}
queryString += 'RETURNING * ;';

console.log(queryString);
