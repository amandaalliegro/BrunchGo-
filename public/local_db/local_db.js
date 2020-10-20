// A clone of the SQL database that can be used to render local data about the menu
// ---> function createLocalDatabase (in scripts/app-helpers.js)
const local_db = {
  //  For example:

  // {
  // 31: {name: "Hamburger", category: "Mains", price: "1500", available: true, prep_time: 360, price: 1500, stock: 10}
  // 32: {name: "Poutine", category: "Mains", price: "1350", available: true, prep_time: 360, price: 1500, stock: 10}
  // 33: {name: "Cheese", category: "Mains", price: "700", available: true, prep_time: 360, price: 1500, stock: 10}
  // }

};

// Each user's cart is generated when they visit the site.
// A user cart is identified by their unique session cookie.
const user_carts = {
// For example:

// 6575: {
//  {name: "Green Salad", category: "Appetizers", price: "800", available: true, prep_time: 360, quantity: 1),
// }

};
