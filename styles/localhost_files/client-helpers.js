$(() => {

  const cartItemCount = function () {
    const itemCount = $('.cart-items > div').length;
    $('.cart-btn').append(`${itemCount}`)
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

  $('.cart-btn').click(() => {
    $('.cart-container').slideToggle(300);
    $('.cart-container').css('display', 'flex');
  });

  $('.cart-item-remove').click(function () {
    const parent = $(this).closest('.cart-item');
    $(parent).remove();
  });
});
