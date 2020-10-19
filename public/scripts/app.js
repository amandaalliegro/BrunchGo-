$(() => {
  // Render user cart if one does not already exist
  $.ajax({
    method: "GET",
    url: '/userid'
  }).then((userid) => {
<<<<<<< HEAD
    createUserCart(userid)
    console.log(user_carts)
=======
    createUserCart(userid);

>>>>>>> 7cef849df118de8546b70de3c286df01ee16941e
  });

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
      // // RENDER "DESSERTS" MENU ROW
      $.ajax({
        method: "GET",
        url: "/api/menu/desserts"
      }).then((items) => {
        createLocalDatabase(items);
        renderMenuRow(items, 'Desserts', 'desserts', 3)
      }).then(() => {
        renderPlusMinusButtons();
      });
    });
  });
});
