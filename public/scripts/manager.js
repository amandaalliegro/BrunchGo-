$(() => {

  $.get('/manager/orders').then((data) => {
    console.log(data)

    const row = `
    <h2 class="sub-header">Orders details:</h2>
    <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Order id</th>
                <th>Customer Name</td>
                <th>Items ordered</th>
                <th>Time expectation</th>
                <th>Total</th>
                <th>Accept</th>
                <th>Finish</th>
              </tr>
            </thead>
            <tbody class="manager-table">
            </tbody>
          </table>
          </div>>
    `
    $('.main').append(row)

    for (const item of data) {

      $.get(`/manager/orders/${item.id}`).then(function (data) {
        console.log(data)

       let itemsDiv = ``;
        for (const item of data) {
          let sentence = `${item.quantity}x ${item.name}<br>`
          itemsDiv += sentence;
        }

        return itemsDiv
      }).then((itemsDiv) => {
        const $divToInsert = `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td id="${item.id}"class="items-ordered">${itemsDiv}</td>
          <td>ipsum</td>
          <td>$${item.total.toFixed(2)}</td>
          <td>
          <input type="submit" style="display: none" value="${item.id}">
          <button type="button" class="btn btn-default btn-sm add-cart-item">
            <span class="glyphicon glyphicon-play " aria-hidden="true"></span> Accept
            </button>
            </input>
            <input type="submit" style="display: none" value="${item.id}">
            <button type="button" class="btn btn-default btn-sm">
              <span class="glyphicon glyphicon-remove " aria-hidden="true"></span> Deny
              </button>
              </input>
          </td>
          <td>
            <input type="submit" style="display: none" value="${item.id}"><button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-ok " aria-hidden="true"></span> Finish it!
            </button></input></td>
        </tr>
`;
    $('.manager-table').append($divToInsert);


      })



    }

  })


})
