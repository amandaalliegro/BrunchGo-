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
  if (user_carts[id])  {
  } else {
    user_carts[id] = {};
  }
  console.log(user_carts)
};

const getUserId = function() {
  return $.ajax({
    method: 'GET',
    url: '/userid'
  }).then((userid) => {
    return userid;
  })
}

const addCartItem = function(userid, itemid) {
  console.log(local_db[itemid])
  if (user_carts[userid][itemid]) {
    user_carts[userid][itemid].quantity += 1;
  } else {
    user_carts[userid][itemid] = local_db[itemid]
    user_carts[userid][itemid].quantity = 1;
  }
  return user_carts[userid][itemid].quantity
};

const removeCartItem = function(userid, itemid) {
  if (user_carts[userid][itemid].quantity > 0) {
    user_carts[userid][itemid].quantity -= 1;
  } else {
  }
  return user_carts[userid][itemid].quantity
};

const setItemQuantity = function (userid, itemid) {
  return user_carts[userid][itemid].quantity
};
