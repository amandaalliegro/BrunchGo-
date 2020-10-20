$(() => {

  const $logInForm = $(`
  <form id='login' class="form-signin" action="/login">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputUserName" class="sr-only">User name</label>
        <input type="user_name" id="inputUserName" class="form-control" placeholder="user name" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
  `);

  window.$logInForm = $logInForm;

  $('.form-signin').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        console.log(json);
        if (!json.user) {
          views_manager.show('error', 'Failed to login');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('listings');
      });
  });

});
