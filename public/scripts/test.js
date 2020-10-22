$(() => {

  $.get('/cookie').then((data)=> {
    const heading = $('body').find('#orderno')[0];
    $(heading).text(`Order: ${data}`)
  });
})
