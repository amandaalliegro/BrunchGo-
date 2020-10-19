$(() => {
  // button to toggle the cart
  $('#cart-toggle').click(() => {
    $('#cart-container').slideToggle(300);
    $('#cart-container').css('display', 'flex');
  });
});
