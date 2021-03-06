const refreshManagerOrders = function () {
  $('.orders').empty()
  $.get('/manager/orders').then((data) => {


    const row = `
    <h2 class="sub-header">Orders details:</h2>
    <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Order id</th>
                <th>Order placed</th>
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
        const $divToInsert = `
        <tr id="${item.id}">
          <td>${item.id}</td>
          <td>${orderDate.toLocaleTimeString()}<br>${orderDate.toLocaleDateString()}</td>
          <td>${item.userid}</td>
          <td>${item.name}</td>
          <td id="${item.id}"class="items-ordered">${itemsDiv}</td>
          <td>${item.phone}</td>
          <td>$${item.total}</td>
          <td class="order_status">${item.order_status}</td>
          <td >
          <input type="text" class="order_time" name="order_time" style="width: 50px" placeholder="mins"></input>
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
        if (item.order_status === 'accepted') {

          const row = $('.orders').find(`#${item.id}`)[0];

          $(row).css('background-color', 'rgb(162, 209, 73)')
        } else if (item.order_status === 'denied') {
          const row = $('.orders').find(`#${item.id}`)[0];
          $(row).css('background-color', 'rgb(209, 100, 73)')
        } else if (item.order_status === 'completed') {
          const row = $('.orders').find(`#${item.id}`)[0];
          $(row).css('background-color', 'rgb(196, 189, 188)')
        } else if (item.order_status === 'received') {
          const row = $('.orders').find(`#${item.id}`)[0];
          $(row).css('background-color', 'rgb(194, 167, 92)')
        }

        const acceptOrderBtn = $(`#${item.id}`).find('.accept-order-btn')[0];



        $(acceptOrderBtn).click(function () {
          const parent = $(this).parent()[0]
            const orderTime = $(parent).find('.order_time').val();

          $.ajax({method: 'post',
          url: `/admin/order/accept/${item.id}`,
          data: {ordertime: orderTime}
          }
            ).then((res) => {
            refreshManagerOrders();
          })
        })

        const completeOrderBtn = $(`#${item.id}`).find('.complete-order-btn')[0];
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
        console.log('finished innr')
      })
    }

  }).done(() => {

      console.log($('body').find('td.order_status'))
  })






}
