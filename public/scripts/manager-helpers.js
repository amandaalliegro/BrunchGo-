const refreshManagerOrders = function () {
  $('.orders').empty()
  $.get('/manager/orders').then((data) => {
    console.log(data)

    const row = `
    <h2 class="sub-header">Orders details:</h2>
    <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Order id</th>
                <th>Order placed<th>
                <th>User id</th>
                <th>Customer Name</td>
                <th>Items ordered</th>
                <th>Phone Number</th>
                <th>Total</th>
                <th>Status</th>
                <th>Accept</th>
                <th>Finish</th>
              </tr>
            </thead>
            <tbody class="manager-table">
            </tbody>
          </table>
          </div>>
    `
    $('.orders').append(row)

    for (const item of data) {

      $.get(`/manager/orders/${item.id}`).then(function (data) {

        let itemsDiv = ``;
        for (const item of data) {
          let sentence = `${item.quantity}x ${item.name}<br>`
          itemsDiv += sentence;
        }

        return itemsDiv
      }).then((itemsDiv) => {
        let orderDate = new Date(item.place_order_datetime)
        console.log()
        const $divToInsert = `
        <tr id="${item.id}">
          <td>${item.id}</td>
          <td>${orderDate.toLocaleTimeString()}<br>${orderDate.toLocaleDateString()}</td>
          <td>${item.userid}</td>
          <td>${item.name}</td>
          <td id="${item.id}"class="items-ordered">${itemsDiv}</td>
          <td>${item.phone}</td>
          <td>$${item.total}</td>
          <td>${item.order_status}</td>
          <td >

          <button type="button" class="btn btn-default btn-sm accept-order-btn">
            <span class="glyphicon glyphicon-play " aria-hidden="true"></span> Accept
            </button>

            <button type="button" class="btn btn-default btn-sm deny-order-btn">
              <span class="glyphicon glyphicon-remove " aria-hidden="true"></span> Deny
              </button>
          </td>
          <td>
         <button type="button" class="btn btn-default btn-sm complete-order-btn">
           Finish it! </button>

            </td>
        </tr>`;

        $('.manager-table').append($divToInsert);

        const acceptOrderBtn = $(`#${item.id}`).find('.accept-order-btn')[0];
        $(acceptOrderBtn).click(() => {
          $.post(`/admin/order/accept/${item.id}`).then((res) => {
            refreshManagerOrders();
          })
        })

        const completeOrderBtn = $(`#${item.id}`).find('.complete-order-btn')[0];
        console.log(completeOrderBtn)
        $(completeOrderBtn).click(() => {
          $.post(`/admin/order/complete/${item.id}`).then((res) => {
            refreshManagerOrders();
          })
        })

        const denyOrderBtn = $(`#${item.id}`).find('.deny-order-btn')[0];
        $(denyOrderBtn).click(() => {
          $.post(`/admin/order/deny/${item.id}`).then((res) => {
            refreshManagerOrders();
          })
        })

      });
    }
  });
}
