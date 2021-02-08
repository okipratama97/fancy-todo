

$(document).ready(function () {
  auth()

  $("#btn-register").on("click", (e) => {
    console.log("Click");
    e.preventDefault()
    showRegister()
  })

  $("#btn-login").on("click", (e) => {
    console.log("Click");
    e.preventDefault()
    showLogin()
  })

  $("#btn-logout").on("click", (e) => {
    console.log("Click");
    e.preventDefault()
    logout()
    auth()
  })

  $("#form-login").on("submit", (e) => {
    console.log("Submit");
    e.preventDefault()
    login()
  })

  $("#form-register").on("submit", (e) => {
    console.log("Submit");
    e.preventDefault()
    register()
  })
});