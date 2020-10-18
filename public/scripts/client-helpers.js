$(() => {

  const cartItemCount = function () {
    const itemCount = $('.cart-items > div').length;
    $('.cart-btn').append(`${itemCount}`)
  };
  cartItemCount();

  $('.add-item-test').click(() => {
    const divToInsert = `
    <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
    `;
    $('.cart-items').append(divToInsert);

    $('.cart-item-remove').click(function () {
      const parent = $(this).closest('.cart-item');
      $(parent).remove();
    })
  });

  $('#cart-toggle').click(() => {
    $('#cart-container').slideToggle(300);
    $('#cart-container').css('display', 'flex');
  });

  $('.cart-item-remove').click(function () {
    console.log('click')
    const parent = $(this).closest('.cart-item');
    $(parent).remove();
  });
});
