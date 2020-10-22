const renderCheckoutButton = function () {
  $('.checkout-btn').click((e) => {
    e.stopPropagation()
    const customerNameInput = $('body').find('#customerName')[0]
    const customerName = $(customerNameInput).val();

    const customerPhoneInput = $('body').find('#customerPhone')[0]
    const customerPhone = $(customerPhoneInput).val();
 
    let subtotal;
    let tax;
    let total;
    getOrderTotal().then((totalPrice) => {
      subtotal = totalPrice;
      tax = totalPrice * 0.15;
      total = Number(totalPrice) + Number(tax);
    }).then(() => {

      $.get('/cart/show').then((data) => {
        console.log(data)
      
  
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
        url: '/api/orders/confirmation',
        data: newOrder,
        dataType: 'json'
      }).then(() => {
        console.log('done')
      })
       })
       })
  });
};
