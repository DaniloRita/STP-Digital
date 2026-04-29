// REGISTRAR

function registrar(){

let email = document.getElementById("email").value;

let senha = document.getElementById("senha").value;

localStorage.setItem("email", email);

localStorage.setItem("senha", senha);

localStorage.setItem("logado", "true");

window.location.href = "home.html";

}



// LOGIN

function login(){

let email = document.getElementById("email").value;

let senha = document.getElementById("senha").value;

let emailSalvo = localStorage.getItem("email");

let senhaSalva = localStorage.getItem("senha");

if(email === emailSalvo && senha === senhaSalva){

localStorage.setItem("logado", "true");

window.location.href = "home.html";

}else{

alert("Email ou senha errados");

}

}

// VERIFICAR LOGIN

function verificarLogin(){

if(localStorage.getItem("logado") !== "true"){

window.location.href = "index.html";

}

}

// LOGOUT

function logout(){

localStorage.removeItem("logado");

window.location.href = "index.html";

}
