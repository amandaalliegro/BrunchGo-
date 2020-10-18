$(() => {

  const cartItemCount = function () {
    const itemCount = $('.cart-items > div').length;
    $('.cart-toggle').text(itemCount);
  };
  cartItemCount();

  $('.add-item-test').click(() => {
    const divToInsert = `
    <div class="cart-item">
    <div>IMG</div>
    <div>
      <h2>Hamburger</h2>
      <div class="cart-item-buttons">
        <button>-</button>
        <span>0</span>
        <button>+</button>
      </div>

    </div>
    <button class="cart-item-remove">X</button>
  </div>
    `;
    $('.cart-items').append(divToInsert);

    $('.cart-item-remove').click(function () {
      const parent = $(this).closest('.cart-item');
      $(parent).remove();
    })
  });

  $('.cart-toggle').click(() => {
    $('.cart-container').slideToggle(300);
    $('.cart-container').css('display', 'flex');
  });

  $('.cart-item-remove').click(function () {
    const parent = $(this).closest('.cart-item');
    $(parent).remove();
  });
});

let cartItems = {};


// Menu item listener
$(() => {
  $("#add-item-1").click(function() {
    let $counter = $(this).parent().children('span');
    let quantity = Number($counter.text());
    quantity++;
    $counter.text(quantity);

    // Get itemId
    let itemId = $(this).attr('id').split("-")[$(this).attr('id').split("-").length - 1];

    // Update itemId
    cartItems[itemId] = {quantity: quantity};
    console.log('cartItems', cartItems);
  });

  $("#minus-item-1").click(function() {
    let $counter = $(this).parent().children('span');
    let quantity = Number($counter.text());
    if (quantity > 0) {
      quantity--;
      $counter.text(quantity);
    } else {
      return;
    }
    // Get itemId
    let itemId = $(this).attr('id').split("-")[$(this).attr('id').split("-").length - 1];

    if (quantity !== 0){
      // Update itemId
      cartItems[itemId] = {quantity: quantity};
    } else {
      delete cartItems[itemId];
    }

    console.log('cartItems', cartItems);
  });
});
