<!DOCTYPE html>
<html class="no-js" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description">
    <meta name="keywords">
    <meta name="robots">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="{!! asset('assets/css/normalize.css') !!}">
    <link rel="stylesheet" href="{!! asset('assets/css/app.css') !!}">
    
    <link rel="stylesheet" href="{!! asset('assets/css/login.css') !!}">
    <script src="{!! asset('assets/js/vendor/jquery-3.1.1.min.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/velocity.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/knockout.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/jquery-ui.min.js') !!}"></script>
  </head>
  <body>
    <div id="container">
      <div class="bg bg--common bg--full">
        {!! Form::open(array('url' => "/login",'class'=>'p-login', 'method' => 'POST')) !!}

          <div class="p-login__area">
            <div class="p-login__area__left">
              <label class="p-login__label">ID</label>
              <input class="p-login__input" type="text" placeholder="ID" name="user_login_id">
              <label class="p-login__label">PASSWORD</label>
              <input class="p-login__input" type="password" placeholder="password" name="password">
            </div>
          </div>
          <input class="p-login__submit" type="submit" value="ログイン">
        {!! Form::close() !!}
      </div>
    </div>
  </body>
</html>
