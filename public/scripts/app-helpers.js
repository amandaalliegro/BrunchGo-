// Adds an item to the user's cart (in user_carts).
// If the item already exists in the cart, the item's quantity is increased by 1.
const addCartItem = function (itemid) {

  $.ajax({
    method: 'POST',
    url: '/cart/add',
    dataType: "json",
    data: {
      id: itemid
    }
  })
}

const createNewOrder = function (userid) {
  $.ajax({
    method: 'POST',
    url: '/api/orders'
  })
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

const refreshCart = function () {



  getUserId().then((userid) => {
    $('.cart-items').empty()

    $.get('/cart').then((cart) => {

      for (const item of cart) {

        const newCartItem = `
    <div class="row cart-row" id="cart-item${item.id}">
    <div class="col-lg-3 col-sm-3 col-xs-3 cart-item-img">
      <img src="${item.image}">
    </div>
    <div class="col-lg-6 col-sm-6 col-xs-4 cart-item-info">
      <span>
        <h3>${item.name}</h3>
        <p class="itemprice">$${((item.price / 100) * item.quantity).toFixed(2)}</p>
      </span>
    </div>
    <div class="col-lg-3 col-sm-3 col-xs-3 cart-counter">
      <div>
        <span><a class="cart-button-minus btn btn-default" role="button">-</a></span>
        <span class="counter">${item.quantity}</span>
        <span><a class="cart-button-plus btn btn-default" role="button">+</a></span>
      </div>
    </div>
  </div>
    `
        $('.cart-items').append(newCartItem)
      }


      $('.cart-footer').empty()
      if ($('.cart-items').children().length === 0) {
        $('.cart-footer').append(`
        <div class="alert alert-info" role="alert" id="empty-cart-msg">Cart empty</div>
        `)

      } else if ($('.cart-items').children().length > 0) {
          $('.cart-footer').append(`
                <div class="row cart-row" id="order-total">Order Total: </div>
                <div class="row cart-row" style="border: none">
                    <div class="col-lg-12 col-sm-12 cart-checkout-button">
                    <form action="/api/orders/user_order" method="GET">
                       <input type="submit" style="display: none"><button class="btn btn-success">Checkout</button></input>
                       </form>
                    </div>
                </div>
        `);
          $('.cart-input').click((e) => {
            e.stopPropagation();
          });
          renderCheckoutButton()

      }

      return cart
    }).then((cart) => {
      syncCounters(cart)
      renderCartPlusMinus();
      syncOrderTotal();
    })
  })

}

// Removes an item from the user's cart (in user_carts).
// If the quantity of the item is greater than 1, it decreases the quantity by 1
const removeCartItem = function (itemid) {
  $.ajax({
    method: 'POST',
    url: '/cart/remove',
    dataType: "json",
    data: {
      id: itemid
    }
  });
};

const renderCartPlusMinus = function () {
  $('.cart-button-plus').click(function (e) {
    e.stopPropagation();
    // set the price of the cart ite
    const divId = $(this).closest('.cart-row')[0];
    const itemId = divId.id.substring(9);
    console.log(itemId)
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
    e.stopPropagation();
    const itemId = $(this).closest('div')[0].id;
    addCartItem(itemId)
    refreshCart();
  });
  $('.minusbutton').click(function (e) {
    console.log('minus button')
    e.stopPropagation();

    const itemid = $(this).closest('div')[0].id;
    removeCartItem(itemid);
    refreshCart();
  });
};

// generates a new html row for a menu category (appetizers, mains, etc) with a column for each menu item in that category
const renderMenuRow = function (data, title, id, order) {

  let newMenuCategory = `<div class="row" style= #A0522D>
  <a id="${id}"></a>
  <h2><b>${title}</b> </h2>
  </div>`;

  $('#main-container').append(newMenuCategory);

  for (let item of data) {
    let menuItem = `
  <div class="d-flex justify-content-center col-md-4 text-center" id="${item.id}">
  <a href="#" class="thumbnail">
    <img src=${item.image} alt="Card image cap">
  </a>
  <h3><i>${item.name}</i></h3>
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

const syncCounters = function (data) {
  resetCounters();

  for (const item of data) {
    // menu counters
    const itemDiv = $('body').find(`#${item.id}`)[0];
    const counterDiv = $(itemDiv).find('.counter')[0]
    $(counterDiv).text(`${item.quantity}`)

    // cart counters

    const cartItemDiv = $('body').find(`#cart-item${item.id}`)[0];
    const cartCounter = $(cartItemDiv).find('.counter')[0]
    $(cartCounter).text(`${item.quantity}`)


  }

};

const getOrderTotal = function () {
  return $.get('/cart/').then((data) => {

    let totalPrice = 0;

    for (const item of data) {
      let thisPrice = Number(item.quantity) * Number(item.price);
      totalPrice += thisPrice;
    }
    totalPrice = (totalPrice / 100).toFixed(2)
    return totalPrice;
  })
}


const syncOrderTotal = function () {
  getOrderTotal().then((totalPrice) => {
    const orderTotalDiv = $('body').find('#order-total')[0];
    $(orderTotalDiv).text(`Order total: $${totalPrice}`)

    $('#cart-btn').html(`<i class="fas fa-shopping-cart"></i> Cart ($${totalPrice})`)
  })
}

