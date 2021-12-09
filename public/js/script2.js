
  function mouseoverPass(obj) {
    var obj = document.getElementById('password');
    obj.type = "text";
  }
  function mouseoutPass(obj) {
    var obj = document.getElementById('password');
    obj.type = "password";
  }

  function mouseoverPass(obj) {
    var obj = document.getElementById('confirm_password');
    obj.type = "text";
  }
  function mouseoutPass(obj) {
    var obj = document.getElementById('confirm_password');
    obj.type = "password";
  }

  $('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else 
      $('#message').html('Not Matching').css('color', 'red');
  });