document.getElementById("fotoInput")
.addEventListener("change", function(e){

let arquivo = e.target.files[0];

if(arquivo){

let leitor = new FileReader();

leitor.onload = function(){

document.getElementById("fotoPerfil")
.src = leitor.result;

/* salva no navegador */

localStorage.setItem(
"fotoPerfil",
leitor.result
);

}

leitor.readAsDataURL(arquivo);

}

});

/* carregar foto salva */

let fotoSalva =
localStorage.getItem("fotoPerfil");

if(fotoSalva){

document.getElementById("fotoPerfil")
.src = fotoSalva;

}
