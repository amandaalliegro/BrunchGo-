const renderCheckoutButton = function () {
  console.log('RENDERING')
  $('.checkout-btn').click((e) => {
    e.stopPropagation()
    const customerNameInput = $('body').find('#customerName')[0]
    const customerName = $(customerNameInput).val();

    const customerPhoneInput = $('body').find('#customerPhone')[0]
    const customerPhone = $(customerPhoneInput).val();

    console.log(customerPhone);
    console.log(customerName)

    getOrderTotal().then((totalPrice) => {
      let subtotal = totalPrice;
      let tax = totalPrice * 0.15;
      let total = totalPrice + tax;
    })

    const newOrder = {
      name: customerName,
      phone: customerPhone,
      subtotal,
      tax,
      total
    };

    $.ajax({
        method: "POST",
        url: '/api/orders/confirmation',
        data: newOrder,
        dataType: 'json'
      }).then(() => {
        console.log('done')
      })
  });
};
