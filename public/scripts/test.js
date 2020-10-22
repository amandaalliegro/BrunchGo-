(() => {
  console.log('running')
  $.get('/cookie').then((data)=> {
    const heading = $('body').find('#orderno')[0];
    console.log(heading)
    $(heading).text(`Order: ${data}`)
  });
})
