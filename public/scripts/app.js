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

  // Render user cart if one does not already exist
  $.ajax({
    method: "GET",
    url: '/userid'
  }).then((userid) => {
    createUserCart(userid);

  }).then(() => {
    refreshCart()
  })




// RENDER MENUS
  // RENDER "APPETIZERS" MENU ROW
  $.ajax({
    method: "GET",
    url: "/api/menu/appetizers"
  }).then((items) => {
    createLocalDatabase(items);
    renderMenuRow(items, 'Appetizers', 'appetizers', 1)
  }).then(() => {
    // RENDER "MAINS" MENU ROW
    $.ajax({
      method: "GET",
      url: "/api/menu/mains"
    }).then((items) => {
      createLocalDatabase(items);
      renderMenuRow(items, 'Mains', 'maindishes', 2)
    }).then(() => {
      // RENDER BEVERAGES MENU ROW
      $.ajax({
        method: 'GET',
        url: '/api/menu/beverages'
      }).then((items) => {
        createLocalDatabase(items);
        renderMenuRow(items, 'Beverages', 'beverages', 3)
      }).then(() => {
        // // RENDER "DESSERTS" MENU ROW
        $.ajax({
          method: "GET",
          url: "/api/menu/desserts"
        }).then((items) => {
          createLocalDatabase(items);
          renderMenuRow(items, 'Desserts', 'desserts', 4)
        }).then(() => {
          renderPlusMinusButtons();
        })
      });
    })


  });
});
