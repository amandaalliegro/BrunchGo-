$(() => {

  // RENDER "APPETIZERS" MENU ROW
  $.ajax({
    method: "GET",
    url: "/api/menu/appetizers"
  }).then((items) => {

    createLocalDatabase(items);


    let newMenuCategory = `<div class="row">
    <a id="appetizers"></a>
      <h2>Appetizers</h2>
      </div>`;

    $('#main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="d-flex justify-content-center col-md-4 text-center">
      <a href="#" class="thumbnail">
        <img src="//placehold.it/200" alt="Card image cap">
      </a>
      <h2>${item.name}</h2>
      <span><a class="btn btn-default" href="#" role="button">-</a></span>
      <span id="item1">0</span>
      <span><a class="btn btn-default" href="#" role="button">+</a></span>
    </div>
            `

      $('#main-container > .row:first-child').append(menuItem);
    }
  }).then(() => {

    // RENDER "MAINS" MENU ROW

    $.ajax({
      method: "GET",
      url: "/api/menu/mains"
    }).then((items) => {

      createLocalDatabase(items);



      let newMenuCategory = `<div class="row">
  <a id="mainsdishes"></a>
  <h2>Mains</h2>
  </div>`;

      $('#main-container').append(newMenuCategory);

      for (let item of items) {
        let menuItem = `
  <div class="d-flex justify-content-center col-md-4 text-center">
  <a href="#" class="thumbnail">
    <img src="//placehold.it/200" alt="Card image cap">
  </a>
  <h2>${item.name}</h2>
  <span><a class="btn btn-default" href="#" role="button">-</a></span>
  <span id="item1">0</span>
  <span><a class="btn btn-default" href="#" role="button">+</a></span>
</div>
        `

        $('#main-container > .row:nth-child(2)').append(menuItem);
      }
    }).then(() => {
      // // RENDER "DESSERTS" MENU ROW

      $.ajax({
        method: "GET",
        url: "/api/menu/desserts"
      }).then((items) => {

        createLocalDatabase(items);


        let newMenuCategory = `<div class="row">
  <a id="desserts"></a>
  <h2>Desserts</h2>
  </div>`;

        $('#main-container').append(newMenuCategory);

        for (let item of items) {
          let menuItem = `
  <div class="d-flex justify-content-center col-md-4 text-center">
  <a href="#" class="thumbnail">
    <img src="//placehold.it/200" alt="Card image cap">
  </a>
  <h2>${item.name}</h2>
  <span><a class="btn btn-default" href="#" role="button">-</a></span>
  <span id="item1">0</span>
  <span><a class="btn btn-default" href="#" role="button">+</a></span>
</div>
        `

          $('#main-container > .row:nth-child(3)').append(menuItem);
        }
      });

    });

  });

$.ajax({
  method: "GET",
  url: '/userid'
}).then((userid) => {
  createUserCart(userid)
})


});
