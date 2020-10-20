const getItemTotal = function (itemid) {
  getUserId().then((userid) => {
    const item = user_carts[userid][itemid];
    const totalPrice = (item.quantity * item.price)
    console.log(totalPrice)
  })
}

// Adds an item to the user's cart (in user_carts).
// If the item already exists in the cart, the item's quantity is increased by 1.
const addCartItem = function (itemid) {
  getUserId().then((userid) => {
    // check if item exists
    if (user_carts[userid][itemid]) {
      user_carts[userid][itemid].quantity += 1;
      // if item doesn't exist, create the item and set quantity to 1
    } else {
      user_carts[userid][itemid] = local_db[itemid];
      user_carts[userid][itemid].quantity = 1;
    }
    return user_carts[userid][itemid].quantity;
  })

};

const createLocalDatabase = function (items) {
  for (const item of items) {
    local_db[item.id] = {
      id: item.id,
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

const createNewOrder = function (userid) {
  $.ajax({
    method: 'POST',
    url: '/api/orders'
  })
}

// Takes the req.session id and creates a new cart (an empty object) in local_db/local_db.js for that id
const createUserCart = function (id) {
  if (user_carts[id]) {
    // if a cart already exists for this user id, do nothing
  } else {
    user_carts[id] = {};
  }
};

const findCounterDiv = function (id, location) {
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
const getUserId = function () {
  return $.ajax({
    method: 'GET',
    url: '/userid'
  }).then((userid) => {
    return userid;
  });
};

const getOrderQuantity = function() {
  let totalQuantity = 0;

  return getUserId().then((userid) => {

    for (const item in user_carts[userid]) {
      const currentItem = user_carts[userid][item]

      let quantity = currentItem.quantity
      totalQuantity += quantity;
    }
    return totalQuantity
  })
}

const getOrderTotal = function() {
  let totalPrice = 0;

  return getUserId().then((userid) => {

    for (const item in user_carts[userid]) {
      const currentItem = user_carts[userid][item]

      let price = currentItem.quantity * currentItem.price
      totalPrice += price;
    }
    return (totalPrice / 100).toFixed(2)
  })
}

const refreshCart = function () {
  if ($('.cart-items').children().length === 0) {
    $('.cart-footer').append(`
          <div class="row cart-row" id="order-total">Order Total: </div>
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

  getUserId().then((userid) => {
    $('.cart-items').empty()

    if (Object.keys(user_carts[userid]).length === 0) {
    $('.cart-footer').empty();

    }

    for (const element in user_carts[userid]) {
      const item = user_carts[userid][element]
      const newCartItem = `
  <div class="row cart-row" id="cart-item${item.id}">
  <div class="col-lg-3 col-sm-3 cart-item-img">
    <img src="${item.image}">
  </div>
  <div class="col-lg-6 col-sm-6 cart-item-info">
    <span>
      <h3>${item.name}</h3>
      <p class="itemprice">$${((item.price / 100) * item.quantity).toFixed(2)}</p>
    </span>
  </div>
  <div class="col-lg-3 col-sm-3 cart-counter">
    <div>
      <span><a class="minusbutton cart-button-minus btn btn-default" role="button">-</a></span>
      <span class="counter">${item.quantity}</span>
      <span><a class="plusbutton cart-button-plus btn btn-default" role="button">+</a></span>
    </div>
  </div>
</div>
  `
      $('.cart-items').append(newCartItem)
    }
  }).then(() => {
    renderCartPlusMinus();

    getOrderTotal().then((total) => {
      $('#order-total').text(`Order Total: $${total}`)
    })
    getOrderQuantity().then((quantity) => {
      $('#dropdownMenu1').html(`<i class="fas fa-shopping-cart"></i> Cart (${quantity})`)
    })

  }).then(() => {
    syncCounters();
  })
}

// Removes an item from the user's cart (in user_carts).
// If the quantity of the item is greater than 1, it decreases the quantity by 1
const removeCartItem = function (itemid) {
  getUserId().then((userid) => {

    // console.log(user_carts[userid][itemid])
    if (user_carts[userid][itemid].quantity > 1) {
      user_carts[userid][itemid].quantity -= 1;
    } else {
      delete user_carts[userid][itemid]
      resetCounters();
      syncCounters()

    }
  })
};

const renderCartPlusMinus = function () {
  $('.cart-button-plus').click(function (e) {
    e.stopPropagation();
    // set the price of the cart ite
    const divId = $(this).closest('.cart-row')[0];
    const itemId = divId.id.substring(9);
    addCartItem(itemId);
    refreshCart();
  })

  $('.cart-button-minus').click(function (e) {
    e.stopPropagation();
    // set the price of the cart ite
    const divId = $(this).closest('.cart-row')[0];
    const itemId = divId.id.substring(9);
   removeCartItem(itemId)
    refreshCart();
  });
}
// renders plus and minus buttons for each item on the menu
const renderPlusMinusButtons = function () {
  $('.plusbutton').off("click");
  $('.minusbutton').off("click");

  $('.plusbutton').click(function (e) {
    e.stopPropagation()
    const itemId = $(this).closest('div')[0].id;
    let parent = $(this).parents()[1];
    const currentCount = Number($(parent).find('.counter').text());
    $(parent).find('.counter').text(currentCount + 1);

    // sync menu counter and cart counter
    let cartCounter = findCounterDiv(itemId, 'Cart');
    const updatedCount = Number($(parent).find('.counter').text());
    $(cartCounter).text(updatedCount)

    // update cart item price
    addCartItem(itemId)

    refreshCart()


    //update order total
  });


  $('.minusbutton').click(function (e) {
    console.log('minus button')
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

      // update cart item price
      removeCartItem(itemId)
      // update order total
      refreshCart()
    }

  });
};
// generates a new html row for a menu category (appetizers, mains, etc) with a column for each menu item in that category
const renderMenuRow = function (data, title, id, order) {

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
  <h2>${item.name}</h2>
  <span class="menu-item-price"> $${(item.price / 100).toFixed(2)} </span>
  <span><a class="minusbutton btn btn-default" role="button">-</a></span>
  <span class="counter">0</span>
  <span><a class="plusbutton btn btn-default" role="button">+</a></span>
  </div>`;

    $(`#main-container > .row:nth-child(${order})`).append(menuItem);
  };
};

const resetCounters = function () {
// reset all counters
const allCounters = $('body').find('.counter')
for (let x = 0; x < allCounters.length; x++) {
  allCounters[x].innerText = 0;
}
}

const syncCounters = function () {
  getUserId().then((userid) => {
    const usercart = user_carts[userid];
    for (const item in usercart) {
      const quantity = usercart[item].quantity
      const menuDiv = $('body').find(`#${usercart[item].id}`)[0];
      const menuCounter = $(menuDiv).find('.counter')[0]
      $(menuCounter).text(quantity)

      const cartDiv = $('body').find(`#cart-item${usercart[item].id}`)[0];
      const cartCounter = $(cartDiv).find('.counter')[0]
      $(cartCounter).text(quantity)
    }
  })
}



