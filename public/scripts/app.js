$(() => {

  // RENDER "APPETIZERS" MENU ROW
  $.ajax({
    method: "GET",
    url: "/api/menu/appetizers"
  }).then((items) => {

    createLocalDatabase(items);

    console.log(items)

    let newMenuCategory = `<div class="row"></div>`;

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

  // $.ajax({
  //   method: "GET",
  //   url: "/api/menu/mains"
  // }).then((items) => {

  //   createLocalDatabase(items);



  //   let newMenuCategory = `
  //   <div class='container'>
  //       <div class="row">
  //       </div>
  //     </div>`;

  //     $('main').append(newMenuCategory);

  //   for (let item of items) {
  //     let menuItem = `
  //     <div class="d-flex justify-content-center col-md-4 text-center">
  //     <a href="#" class="thumbnail">
  //       <img src="//placehold.it/200" alt="Card image cap">
  //     </a>
  //     <h2>Heading</h2>
  //     <span><a class="btn btn-default" href="#" role="button">-</a></span>
  //     <span id="item1">0</span>
  //     <span><a class="btn btn-default" href="#" role="button">+</a></span>
  //   </div>
  //           `

  //           $('.container > .container:nth-child(2)').append(menuItem);
  //   }
  // });

  // // RENDER "DESSERTS" MENU ROW

  // $.ajax({
  //   method: "GET",
  //   url: "/api/menu/desserts"
  // }).then((items) => {

  //   createLocalDatabase(items);


  //   let newMenuCategory = `
  //   <div class='container'>
  //       <div class="row">
  //       </div>
  //     </div>`;

  //     $('main').append(newMenuCategory);

  //   for (let item of items) {
  //     let menuItem = `
  //     <div class="d-flex justify-content-center col-md-4 text-center">
  //     <a href="#" class="thumbnail">
  //       <img src="//placehold.it/200" alt="Card image cap">
  //     </a>
  //     <h2>Heading</h2>
  //     <span><a class="btn btn-default" href="#" role="button">-</a></span>
  //     <span id="item1">0</span>
  //     <span><a class="btn btn-default" href="#" role="button">+</a></span>
  //   </div>
  //           `

  //           $('main:nth-child(1) > .container:nth-child(3)').append(menuItem);
  //   }
  // });
});
