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
      let totalPrice = 0;

      for (const item in user_carts[userid]) {
        const currentItem = user_carts[userid][item]

        let price = currentItem.quantity * currentItem.price
        totalPrice += price;
      }

      totalPrice = Number(totalPrice / 100);

      newOrder.sub_total = totalPrice;
      let tax = Number(totalPrice * 0.15);
      newOrder.tax = tax

      newOrder.total = totalPrice + tax;

      const usercart = user_carts[userid]
      newOrder.order = usercart;

      const newOrderid = Math.floor(Math.random() * 100000)
      newOrder.orderid = newOrderid;
      newOrder.userid = userid

      $.ajax({
        method: "POST",
        url: '/api/orders/confirmation',
        data: newOrder,
        dataType: 'json'
      });
    });
  });
};
