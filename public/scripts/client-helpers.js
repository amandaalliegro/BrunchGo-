const checkPhone = function (phone) {

  if (!phone) {
    return 'Please enter a valid phone number';
  } else if (phone.length < 10) {
    return 'Please enter a valid phone number'
  } else if (phone.length > 10) {
    return 'Please enter a valid phone number'
  } else {
    return null;
  }

}

const checkName = function (name) {

  if (!name) {
    return 'Please enter your name';
  } else if (name.length < 2) {
    return 'Name too short'
  } else {
    return null;
  }


}
const renderCheckoutButton = function () {
  $('.checkout-btn').click((e) => {

    const customerNameInput = $('body').find('#customerName')[0]
    const customerName = $(customerNameInput).val();
    const customerPhoneInput = $('body').find('#customerPhone')[0]
    const customerPhone = $(customerPhoneInput).val();

    if (checkPhone(customerPhone)) {
      $('.errors').empty()
      let error = checkPhone(customerPhone)
      $('.errors').prepend(`<div class="alert alert-danger" role="alert" id="empty-cart-msg">${error}</div>`)
    } else if (checkName(customerName)) {
      $('.errors').empty()
      let nameError = checkName(customerName)
      $('.errors').prepend(`<div class="alert alert-danger" role="alert" id="empty-cart-msg">${nameError}</div>`)
    } else {

      $('.errors').empty()
      let subtotal;
      let tax;
      let total;
      getOrderTotal().then((totalPrice) => {
        subtotal = Number(totalPrice);
        tax = totalPrice * 0.15;
        total = Number(totalPrice) + Number(tax);


      }).then(() => {
        $.get('/cart/show').then((data) => {

          const newOrder = {
            name: customerName,
            phone: customerPhone,
            subtotal,
            tax,
            total,
            order: data
          };
          $.ajax({
            method: "POST",
            url: '/api/orders/new',
            data: newOrder,
            dataType: 'json',
            success: function (data) {
              window.location.assign('/api/orders/confirmation');
            },
            error: function(jqXhr, textStatus, errorMessage) {
              console.log('error: ', errorMessage);
            }
          })
        });
      });
    };
  })
};
