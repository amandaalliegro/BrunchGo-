const createLocalDatabase = function (items) {
  for (const item of items) {
    local_db[item.id] = {
      name: item.name,
      category: item.category,
      price: item.price,
      available: item.available,
      prep_time: item.prep_time,
      image: item.image,
      stock: item.stock
    };
  }
};
