const base_url = "https://pancitodo.herokuapp.com"

function auth() {
  if (localStorage.access_token) {
    showMain()
    fetchAllTodos()
    showWeather()
  }
  else {
    showLogin()
  }
}

function showRegister() {
  console.log("Show Register");
  $("#login-page").hide()
  $("#register-page").show()
  $("#main-page").hide()
}

function showLogin() {
  console.log("Show Login");
  $("#login-page").show()
  $("#register-page").hide()
  $("#main-page").hide()
}

function showMain() {
  console.log("Show Main");
  $("#login-page").hide()
  $("#register-page").hide()
  $("#main-page").show()

}

function login(em = "", pass = "") {
  const email = em || $("#login-email").val()
  const password = pass || $("#login-password").val()
  $.ajax({
    method: "POST",
    url: base_url + "/login",
    data: { email, password }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE LOGIN");
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR LOGIN");
      const message = hxr.responseJSON.message
      showToast(message)
    })
    .always(_ => {
      $("#form-login").trigger("reset")
    })
}

function register() {
  const name = $("#register-name").val()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  $.ajax({
    method: "POST",
    url: base_url + "/register",
    data: { name, email, password }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE REGISTER");
      login(email, password)
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR REGISTER");
      const message = hxr.responseJSON.message.join("\n")
      showToast(message)
    })
    .always(_ => {
      $("#form-register").trigger("reset")
    })
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear()
}

function appendAddButton() {
  const add_button = `
    <div class="Content content-add" id="add-todo">
      <button class="btn-status btn-add" onclick="newTodo()" >New Todo</button>
    </div>
    `
  $("#content-todos").append(add_button)
}

function deleteTodo(id) {
  $.ajax({
    method: "DELETE",
    url: base_url + "/todos/" + id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE DELETE");
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR DELETE");
      const message = hxr.responseJSON.message
      showToast(message)
    })
}

function setStatusTodo(id) {
  getTodo(id)
    .then(response => {
      let newStatus = (response.status === "active") ? "done" : "active"
      return $.ajax({
        method: "PATCH",
        url: base_url + "/todos/" + response.id,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          status: newStatus
        }
      })
    })
    .done((response) => {
      console.log("THIS IS RESPONSE PATCH");
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR PATCH");
      const message = hxr.responseJSON.message
      showToast(message)
    })
}

function editTodo(id) {
  auth()
  getTodo(id)
    .done(response => {
      const due = new Date(response.due_date).toISOString().substr(0, 10);
      $(`#todo-${response.id}`).empty()
      $(`#todo-${response.id}`).html(`
        <div>
          <h2 class="active">Edit Todo</h2>
        </div>
        
        <form class="cancel-alert" id="form-edit">
          <input type="text" id="edit-title" name="title" placeholder="title" value=${response.title}>
          <input type="text" id="edit-description" name="description" placeholder="description" value=${response.description}>
          <br>
          <label class="form-check-label" for="">Status:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="status" id="edit-status-active" value="active">
            <label class="form-check-label" for="edit-status-active">active</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="status" id="edit-status-done" value="done">
            <label class="form-check-label" for="edit-status-done">done</label>
          </div>
          <input type="date" id="edit-due_date" name="due_date" value=${due}>
          <input type="submit" value="Submit">
        </form>
        
        <div id="formFooter">
          <a class="underlineHoverRed red" href="#" role="button" id="btn-edit-cancel">Cancel</a>
        </div>
        `)
      if (response.status === "active") $(`#edit-status-active`).prop("checked", true)
      else $(`#edit-status-done`).prop("checked", true)

      $("#btn-edit-cancel").on("click", (e) => {
        e.preventDefault()
        auth()
      })

      $("#form-edit").on("submit", (e) => {
        e.preventDefault()
        putTodo(response.id)
      })

      console.log("THIS IS RESPONSE POPULATE");
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR POPULATE");
      const message = hxr.responseJSON.message
      showToast(message)
    })

}

function putTodo(id) {
  const title = $("#edit-title").val()
  const description = $("#edit-description").val()
  const status = $('input[name=status]:checked', "#form-edit").val()
  const due_date = $("#edit-due_date").val()
  $.ajax({
    method: "PUT",
    url: base_url + "/todos/" + id,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: { title, description, status, due_date }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE PUT");
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR PUT");
      const message = hxr.responseJSON.message
      showToast(message)
    })
    .always(_ => {
      $("#form-edit").trigger("reset")
    })
}

function newTodo() {
  $("#add-todo").hide()
  $("#content-todos").append(`
      <div class="Content" id="todo-add">
        <div>
          <h2 class="active">Add Todo</h2>
        </div>
        
        <form class="cancel-alert" id="form-add">
          <input type="text" id="add-title" name="title" placeholder="title" >
          <input type="text" id="add-description" name="description" placeholder="description" >
          <br>
          <label class="form-check-label" for="">Status:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="status" id="add-status-active" value="active">
            <label class="form-check-label" for="add-status-active">active</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="status" id="add-status-done" value="done">
            <label class="form-check-label" for="add-status-done">done</label>
          </div>
          <input type="date" id="add-due_date" name="due_date" >
          <input type="submit" value="Submit">
        </form>
        
        <div id="formFooter">
          <a class="underlineHoverRed red" href="#" role="button" id="btn-add-cancel">Cancel</a>
        </div>
      </div>
      `)

  $("html").scrollLeft($(document).width() - $(window).width())

  $("#btn-add-cancel").on("click", (e) => {
    e.preventDefault()
    auth()
  })

  $("#form-add").on("submit", (e) => {
    e.preventDefault()
    addTodo()
  })

}

function addTodo() {
  console.log("ADDING NEW TODO");
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const status = $('input[name=status]:checked', "#form-add").val()
  const due_date = $("#add-due_date").val()
  $.ajax({
    method: "POST",
    url: base_url + "/todos",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: { title, description, status, due_date }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE ADD");
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR ADD");
      const message = hxr.responseJSON.message
      showToast(message)
    })
    .always(_ => {
      $("#form-add").trigger("reset")
    })
}

function getTodo(id) {
  return $.ajax({
    method: "GET",
    url: base_url + "/todos/" + id,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
}

function fetchAllTodos() {
  $.ajax({
    method: "GET",
    url: base_url + "/todos",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE GET TODOS");
      $("#content-todos").empty()
      response.forEach(el => {
        let due = new Date(el.due_date).toISOString().substr(0, 10)
        $("#content-todos").append(`
          <div class="Content" id="todo-${el.id}">
            <div>
              <h2 class="${el.status}" id="todo-title-${el.id}">${el.title}</h2>
            </div>
            <div class="info">
              <p id="todo-description-${el.id}">${el.description}</p>
              <small id="todo-due_date-${el.id}">${due}</small>
            </div>
            <button class="btn-status ${el.status}" id="todo-status-${el.id}" onclick="setStatusTodo(${el.id})">Status: ${el.status}</button>
            <div id="formFooter">
              <a class="underlineHover todo-anchor" href="#" role="button" id="btn-todo-edit-${el.id}" onclick="editTodo(${el.id})">Edit</a>
              <a class="underlineHoverRed todo-anchor red" href="#" role="button" id="btn-todo-delete-${el.id}" onclick="deleteTodo(${el.id})">Delete</a>
            </div>
          </div>
          `)
      })
      appendAddButton()
      if (response.length <= 1) $("#content-todos").css("justify-content", "center")
      else $("#content-todos").css("justify-content", "start")
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR GET TODOS");
      const message = hxr.responseJSON.message
      showToast(message)
    })
}



function showToast(message, variant = "error") {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: variant,
    title: message
  })
}

function showWeather() {
  $.ajax({
    method: "GET",
    url: base_url + "/todos/weather",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done((response) => {
      console.log("THIS IS RESPONSE GET WEATHER");
      const { weather, temp } = response
      $("#weather").empty()
      $("#weather").append(`<div class="topleft"><div>${weather}</div><div>${temp} °C</div></div>`)
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR GET WEATHER");
    })
}

function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: base_url + '/googleLogin',
    method: 'POST',
    data: {
      tokenGoogle
    }
  })
    .done(response => {
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((hxr, text) => {
      console.log("THIS IS ERROR GOOGLE LOGIN");
    })
}