$(() => {

  // RENDER "APPETIZERS" MENU ROW
  $.ajax({
    method: "GET",
    url: "/api/menu/appetizers"
  }).then((items) => {

    createLocalDatabase(items);



    let newMenuCategory = `
    <div class='container'>
        <h3 class='item-heading'>Appetizers</h3>
        <div class="row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="d-flex justify-content-center col-lg-4 col-md-6 col-sm-12 text-center">
      <a href="#" class="thumbnail">
        <img src="${item.image}" alt="Card image cap">
      </a>
      <h2>${item.name}</h2>
      <h3>$${(item.price / 100).toFixed(2)}</h3>
      <span><a class="btn btn-default" href="#" role="button">-</a></span>
      <span id="item1">0</span>
      <span><a class="btn btn-default" href="#" role="button">+</a></span>
    </div>
            `

            $('.main-container > .container:nth-child(1) > .row').append(menuItem);
    }
  });

  // RENDER "MAINS" MENU ROW

  $.ajax({
    method: "GET",
    url: "/api/menu/mains"
  }).then((items) => {

    createLocalDatabase(items);



    let newMenuCategory = `
    <div class='container'>
        <h3 class='item-heading'>Mains</h3>
        <div class="row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="d-flex justify-content-center col-md-4 col-sm-6 text-center">
      <a href="#" class="thumbnail">
        <img src="${item.image}" alt="Card image cap">
      </a>
      <h2>${item.name}</h2>
      <h3>$${(item.price / 100).toFixed(2)}</h3>
      <span><a class="btn btn-default" href="#" role="button">-</a></span>
      <span id="item1">0</span>
      <span><a class="btn btn-default" href="#" role="button">+</a></span>
    </div>
            `

            $('.main-container > .container:nth-child(2) > .row').append(menuItem);
    }
  });

  // RENDER "DESSERTS" MENU ROW

  $.ajax({
    method: "GET",
    url: "/api/menu/desserts"
  }).then((items) => {

    createLocalDatabase(items);



    let newMenuCategory = `
    <div class='container'>
        <h3 class='item-heading'>Desserts</h3>
        <div class="row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="d-flex justify-content-center col-md-4 col-sm-6 text-center">
      <a href="#" class="thumbnail">
        <img src="${item.image}" alt="Card image cap">
      </a>
      <h2>${item.name}</h2>
      <h3>$${(item.price / 100).toFixed(2)}</h3>
      <span><a class="btn btn-default" href="#" role="button">-</a></span>
      <span id="item1">0</span>
      <span><a class="btn btn-default" href="#" role="button">+</a></span>
    </div>
            `

            $('.main-container > .container:nth-child(3) > .row').append(menuItem);
    }
  });
});
