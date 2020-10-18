function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "No such cookie...";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};




$(() => {
  const obj = {a:1};
  window.localStorage.setItem('cart', 'testing...');
  document.cookie = `cart=${JSON.stringify(obj)}`;

  console.log(getCookie('cart'));

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
  });

  // RENDER "MAINS" MENU ROW

  $.ajax({
    method: "GET",
    url: "/api/menu/mains"
  }).then((items) => {

    createLocalDatabase(items);



    let newMenuCategory = `<div class="row">
    <a id="mains"></a>
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
  });

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
