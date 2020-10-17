$(() => {

  // RENDER "APPETIZERS" MENU ROW
  $.ajax({
    method: "GET",
    url: "/api/menu/appetizers"
  }).then((items) => {

    createLocalDatabase(items);

    let newMenuCategory = `
    <div class='item-container'>
        <h3 class='item-heading'>Appetizers</h3>
        <div class="item-row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="item-box" id="${item.id}">
              <div class="item-header">${item.name}</div>
              <div class="item-main" style="background-image: url('${item.image}')"></div>
              <div class="item-footer">
                <p class='item-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div class="item-price">$${item.price /100}</div>
                <div class="select-item-container">
                  <i class="fas fa-plus"></i>
                  <span class="menu-item-quantity">0</span>
                  <i class="fas fa-minus"></i>
                </div>
              </div>
            </div>
            `
            $('.item-row').append(menuItem);
    }
  });

  // RENDER "MAINS" MENU ROW

  $.ajax({
    method: "GET",
    url: "/api/menu/mains"
  }).then((items) => {

    createLocalDatabase(items);

    let newMenuCategory = `
    <div class='item-container'>
        <h3 class='item-heading'>Mains</h3>
        <div class="item-row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="item-box" id="${item.id}">
              <div class="item-header">${item.name}</div>
              <div class="item-main" style="background-image: url('${item.image}')"></div>
              <div class="item-footer">
                <p class='item-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div class="item-price">$${item.price /100}</div>
                <div class="select-item-container">
                  <i class="fas fa-plus"></i>
                  <span class="menu-item-quantity">0</span>
                  <i class="fas fa-minus"></i>
                </div>
              </div>
            </div>
            `

            $('.main-container > .item-container:nth-child(2) > .item-row').append(menuItem);
    }
  });

  // RENDER "DESSERTS" MENU ROW

  $.ajax({
    method: "GET",
    url: "/api/menu/desserts"
  }).then((items) => {

    createLocalDatabase(items);

    let newMenuCategory = `
    <div class='item-container'>
        <h3 class='item-heading'>Desserts</h3>
        <div class="item-row">
        </div>
      </div>`;

      $('.main-container').append(newMenuCategory);

    for (let item of items) {
      let menuItem = `
      <div class="item-box" id="${item.id}">
              <div class="item-header">${item.name}</div>
              <div class="item-main" style="background-image: url('${item.image}')"></div>
              <div class="item-footer">
                <p class='item-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div class="item-price">$${item.price /100}</div>
                <div class="select-item-container">
                  <i class="fas fa-plus"></i>
                  <span class="menu-item-quantity">0</span>
                  <i class="fas fa-minus"></i>
                </div>
              </div>
            </div>
            `

            $('.main-container > .item-container:nth-child(3) > .item-row').append(menuItem);

            console.log(local_db)
    }
  });
});
