const renderCheckoutButton = function () {
  $('.checkout-btn').click((e) => {
    e.stopPropagation()
    const customerNameInput = $('body').find('#customerName')[0]
    const customerName = $(customerNameInput).val();

    const customerPhoneInput = $('body').find('#customerPhone')[0]
    const customerPhone = $(customerPhoneInput).val();

    const newOrder = {
      orderid: '',
      userid: '',
      name: customerName,
      phone: customerPhone
    }

    getUserId().then((userid) => {
      const usercart = user_carts[userid]
      newOrder.order = usercart;

      const newOrderid = Math.floor(Math.random() * 100000)
      newOrder.orderid = newOrderid;
      newOrder.userid = userid

      $.ajax({
        method: "POST",
        url: '/api/orders/confirmation',
        data: newOrder,
        dataType: 'json',
        success: function(data) {
          const k = data;
          console.log(k)
        }
      });
    })
  })
}
