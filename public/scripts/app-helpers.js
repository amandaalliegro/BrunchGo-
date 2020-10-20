// Adds an item to the user's cart (in user_carts).
// If the item already exists in the cart, the item's quantity is increased by 1.
const addCartItem = function(userid, itemid) {
  // check if item exists
  if (user_carts[userid][itemid]) {
    user_carts[userid][itemid].quantity += 1;
    // if item doesn't exist, create the item and set quantity to 1
  } else {
    user_carts[userid][itemid] = local_db[itemid];
    user_carts[userid][itemid].quantity = 1;
  }
  return user_carts[userid][itemid].quantity;
};


const addToCart = function(userid, itemid, quantity) {
  if (quantity === 0) {
    return null;
  }


  const currentItem = user_carts[userid][itemid];

  if (currentItem) {
    user_carts[userid][itemid].quantity = quantity;
    const cartCounterToChange = $(`#cart-item${itemid}`).find('.counter')[0];
    $(cartCounterToChange).text(quantity);
  } else {
    const menuItem = local_db[itemid]
    menuItem.quantity = quantity;
    insertCartItem(menuItem, itemid);
    user_carts[userid][itemid] = menuItem;
    $('.cart').find('')
  }
}

const createLocalDatabase = function(items) {
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

const createNewOrder = function(userid) {

}

// Takes the req.session id and creates a new cart (an empty object) in local_db/local_db.js for that id
const createUserCart = function (id) {
  if (user_carts[id]) {
    // if a cart already exists for this user id, do nothing
  } else {
    user_carts[id] = {};
  }
};

const findCounterDiv = function(id, location) {
  if (location === 'Menu') {
    const parentDiv = $('body').find(`#${id}`);
    const counterDiv = $(parentDiv).find('.counter')[0];
    return counterDiv
  } else if (location === 'Cart') {
   const parentDiv = $('body').find(`#cart-item${id}`);
   const counterDiv = $(parentDiv).find('.counter')[0];
   return counterDiv;
  }

}

// queries the server for the user's cookie and returns the cookie
const getUserId = function() {
  return $.ajax({
    method: 'GET',
    url: '/userid'
  }).then((userid) => {
    return userid;
  });
};

const insertCartItem = function(menuItem, itemid) {
  if ($('.cart').children().length === 1) {
    $('.cart').append(`
    <div class="row cart-row" style="border: none">
                <div class="col-lg-12 col-sm-12 cart-checkout-button">
                  <button class="btn btn-success checkout-btn">Checkout</button>
                </div>
              </div>
    `);
    $('.cart-checkout-button').click(() => {
      getUserId().then((userid) => {
        createNewOrder(userid);
      })

    })
  }
  const newCartItem = `
  <div class="row cart-row" id="cart-item${itemid}">
  <div class="col-lg-3 col-sm-3 cart-item-img">
    <img src="${menuItem.image}">
  </div>
  <div class="col-lg-6 col-sm-6 cart-item-info">
    <span>
      <h3>${menuItem.name}</h3>
      <p class="itemprice">$${((menuItem.price / 100) * menuItem.quantity).toFixed(2)}</p>
    </span>
  </div>
  <div class="col-lg-3 col-sm-3 cart-counter">
    <div>
      <span><a class="minusbutton cart-button btn btn-default" role="button">-</a></span>
      <span class="counter">${menuItem.quantity}</span>
      <span><a class="plusbutton cart-button btn btn-default" role="button">+</a></span>
    </div>
  </div>
</div>
  `
  $('.cart-items').append(newCartItem)
}

// Removes an item from the user's cart (in user_carts).
// If the quantity of the item is greater than 1, it decreases the quantity by 1
const removeCartItem = function (userid, itemid) {
  if (user_carts[userid][itemid].quantity > 0) {
    user_carts[userid][itemid].quantity -= 1;
  } else {
  }
  return user_carts[userid][itemid].quantity;
};

const renderAddItemButtons = function() {
  $('.add-cart-item').click(function (e) {
    e.preventDefault();
    const itemId = $(this).closest('div')[0].id;
    const parent = $(this).parents()[0];
    const quantity = Number($(parent).find('.counter').text());
    getUserId().then((userid) => {
      addToCart(userid, itemId, quantity)

    }).then(() => {
      renderPlusMinusButtons();
      renderCartPlusMinus();
    })
  })
}

const renderCartPlusMinus = function() {
  $('.cart-button').click(function() {
    const thisDiv = $(this).closest('div')[0];
    const counterDiv = $(thisDiv).find('.counter')[0];
    const currentCount = $(counterDiv).text()
    let itemId = $(this).closest('.cart-row')[0].id[9];
    let itemPrice = Number((local_db[itemId].price)) / 100;
    const totalPrice = (itemPrice * currentCount).toFixed(2);
    const priceDiv = $(this).closest('.cart-row').find('.itemprice');
    $(priceDiv).text(`$${totalPrice}`)

    // Sync cart counter with menu counter
    let menuCounter = findCounterDiv(itemId, 'Menu');
    $(menuCounter).text(currentCount)

  })
}

// renders plus and minus buttons for each item on the menu
const renderPlusMinusButtons = function() {
  $('.plusbutton').off("click");
  $('.minusbutton').off("click");

  $('.plusbutton').click(function(e) {
    e.stopPropagation()
    const itemId = $(this).closest('div')[0].id;
    let parent = $(this).parents()[1];
      const currentCount = Number($(parent).find('.counter').text());
      $(parent).find('.counter').text(currentCount + 1);

      // sync menu counter and cart counter
      let cartCounter = findCounterDiv(itemId, 'Cart');
      const updatedCount = Number($(parent).find('.counter').text());
      $(cartCounter).text(updatedCount)
  });


  $('.minusbutton').click(function(e) {
    e.stopPropagation()
    const itemId = $(this).closest('div')[0].id;
    let parent = $(this).parents()[1];
      const currentCount = Number($(parent).find('.counter').text());
      if (currentCount === 0) {
        //do not decrease past 0
      } else {
        $(parent).find('.counter').text(currentCount - 1)

         // sync menu counter and cart counter
      let cartCounter = findCounterDiv(itemId, 'Cart');
      const updatedCount = Number($(parent).find('.counter').text());
      $(cartCounter).text(updatedCount)
      }

  });
};

// generates a new html row for a menu category (appetizers, mains, etc) with a column for each menu item in that category
const renderMenuRow = function(data, title, id, order) {

  let newMenuCategory = `<div class="row">
  <a id="${id}"></a>
  <h2>${title}</h2>
  </div>`;

  $('#main-container').append(newMenuCategory);

  for (let item of data) {
    let menuItem = `
  <div class="d-flex justify-content-center col-md-4 text-center" id="${item.id}">
  <a href="#" class="thumbnail">
    <img src=${item.image} alt="Card image cap">
  </a>
  <h2>${item.name}  $${(item.price / 100).toFixed(2)}</h2>
  <span><a class="minusbutton btn btn-default" role="button">-</a></span>
  <span class="counter">0</span>
  <span><a class="plusbutton btn btn-default" role="button">+</a></span>
  <button type="button" class="btn btn-default btn-lg add-cart-item">
  <span class="glyphicon glyphicon-plus " aria-hidden="true"></span> Add
  </button>
  </div>`;

    $(`#main-container > .row:nth-child(${order})`).append(menuItem);
  };
};

<<<<<<< HEAD
const setItemQuantity = function (userid, itemid) {
  return user_carts[userid][itemid].quantity;
};
=======
const renderNewMenuManager = function(data) {
  let newMenuManager = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  <h2 class="sub-header">Include new items:</h2>
  <div class="table-responsive">`
  $("table table-striped").append(newMenuManager);
  for (let item of data) {
    let name = item.name;
    name = `<tbody>
    <tr>
      <td>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="">
      </div>
    </td>`
    let category = item.category;
    category = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
    </div>
    </td>`
    let price = item.price;
    price = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
      </div>
    </td>`
    let available = item.available;
    available = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
      </div>
    </td>`
    let prepTime = item.prep_time;
    prepTime = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
      </div>
    </td>`
    let stock = item.stock;
    stock = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
      </div>
    </td>
    <td>
        <button type="button" class="btn btn-default btn-sml add-cart-item">
          <span class="glyphicon glyphicon-plus " aria-hidden="true"></span> ok
          </button>
    </td>

    </tr>

  </tbody>`
  }
}
const renderMenuManager = function(data) {
  let menuManager = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  <h2 class="sub-header">Include new items:</h2>
  <div class="table-responsive">`
  $("table table-striped").append(menuManager);
  for (let item of data) {
    let name = item.name;
    name = `<tbody>
    <tr>
      <td>
        <div${item.name}</div>
    </td>`
    let category = item.category;
    category = `<td>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="">
    </div>
    </td>`
    let price = item.price;
    price = `<td>
      <div ${item.price}</div>
    </td>`
    let available = item.available;
    available = `<td>
      <div ${item.available}
      </div>
    </td>`
    let prepTime = item.prep_time;
    prepTime = `<td>
      <div ${item.prep_time}
      </div>
    </td>`
    let stock = item.stock;
    stock = `<td>
      <div ${item.stock}
      </div>
    </td>
    <td>
        <button type="button" class="btn btn-default btn-sml add-cart-item">
          <span class="glyphicon glyphicon-plus " aria-hidden="true"></span> ok
          </button>
    </td>

    </tr>

  </tbody>`
  }
}
>>>>>>> amanda

