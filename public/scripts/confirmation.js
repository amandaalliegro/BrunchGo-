$(() => {

  getUserId().then((userid) => {
    let subtotal;
    let tax;
    let total;
    getOrderTotal().then((totalPrice) => {
      subtotal = Number(totalPrice);
      tax = Number(subtotal * 0.15);
      total = subtotal + tax;
      // console.log(total)
    }).done(() => {



      $.get(`/cart/show`).then((items) => {



        for (const item of items) {
          // console.log(item)
          const newItem = `
  <div class="row cart-row" id="cart-item${item.id}">
  <div class="col-lg-3 col-sm-3 col-xs-3 cart-item-img">
    <img src="${item.image}" style="max-height = 75px!important">
  </div>
  <div class="col-lg-6 col-sm-6 col-xs-6 cart-item-info">
    <span>
      <h3>${item.name}</h3>
      <p class="itemprice">$${((item.price / 100) * item.quantity).toFixed(2)}</p>
    </span>
  </div>
  <div class="col-lg-3 col-sm-3 col-xs-3 cart-counter">
    <div>

      <span class="counter">${item.quantity}</span> <span><a href="#"> Change</a></span>

    </div>
  </div>
</div>`
          $('.order-items').append(newItem)

        }
      }).then(() => {
        $('.order-items').append(`

        <div class="container" style="max-width: 600px">
        <div class="row cart-row">
        <div class="errors"></div>
        <div class="input-group input-group-md">
        <span class="input-group-addon">
<span class="glyphicon glyphicon-user" aria-hidden="true">
</span>
</span>

          <input type="text" class="form-control" id="customerName" placeholder="Name"></input>
          </div>
          <div class="input-group input-group-md">
          <span class="input-group-addon">
<span class="glyphicon glyphicon-phone-alt" aria-hidden="true">
</span>
</span>
          <input type="text" class="form-control" id="customerPhone" placeholder="Format: ##########"></input>
          </div>

          </div>
        <div class="row cart-row">
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <h2>Total: $${Number(total).toFixed(2)}</h2>
        </div>


          <div class="row cart-row" style="border: none">

              <div class="col-lg-12 col-sm-12 cart-checkout-button">
                 <button style="height: 100px" class="btn btn-success checkout-btn">Confirm Order</button>
              </div>
              </div>
          </div>
        `)
        renderCheckoutButton()
      })
    })

  })
})
