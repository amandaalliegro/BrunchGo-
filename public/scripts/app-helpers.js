const createLocalDatabase = function (items) {
  for (const item of items) {
    local_db[item.id] = {
      name: item.name,
      category: item.category,
      price: item.price,
      available: item.available,
      prep_time: item.prep_time,
      image: item.image,
      stock: item.stock
    };
  }
};

// Takes the req.session id and creates a new cart (an empty array) in local_db/local_db.js for that id
const createUserCart = function(id) {
  user_carts[id] = [];
};
