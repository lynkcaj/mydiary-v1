function mouseoverPass(obj) {
    var obj = document.getElementById('myPassword');
    obj.type = "text";
  }
  function mouseoutPass(obj) {
    var obj = document.getElementById('myPassword');
    obj.type = "password";
  }

 function checkPasswordMatch() {
  const password = $("#password").val();
  const confirmPassword = $("#confirm_password").val();
  const notMatch = "Password do not match!";
  let match = "Password match.";
  let result1 = match.fontcolor("green");
  let result2 = notMatch.fontcolor("red");

  if (password != confirmPassword)
      $("#divCheckPasswordMatch").html(result2);
  else
      $("#divCheckPasswordMatch").html(result1);
}