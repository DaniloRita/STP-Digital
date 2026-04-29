const API_KEY = "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";

async function enviar(){

let pergunta =
document.getElementById("pergunta").value;

if(pergunta === ""){
return;
}

let chat =
document.getElementById("chat");

/* mensagem usuário */

chat.innerHTML += `
<div class="msg-user">
${pergunta}
</div>
`;

document.getElementById("pergunta").value = "";

/* loading */

chat.innerHTML += `
<div class="msg-ia" id="loading">
Pensando...
</div>
`;

chat.scrollTop = chat.scrollHeight;

try{

const resposta = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{

method:"POST",

headers:{
"Content-Type":"application/json",

"Authorization":"Bearer " + API_KEY
},

body:JSON.stringify({

model:"llama-3.3-70b-versatile",

messages:[

{
role:"system",

content:`
Você é uma IA educativa do STP-Digital.

Ajude jovens santomenses com:
- educação
- programação
- tecnologia
- criatividade
- respeito
- aprendizado positivo.

Nunca incentive violência,
ódio ou desinformação.
`
},

{
role:"user",
content: pergunta
}

]

})

}

);

const dados =
await resposta.json();
console.log(dados)
//alert(JSON.stringify(dados))

document.getElementById("loading").remove();

chat.innerHTML += `
<div class="msg-ia">
${dados.choices[0].message.content
.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
.replace(/^\*(.*$)/gm, "•$1")
.replace(/\*(.*?)\*/g, "<i>$1</i>")
.replace(/`(.*?)`/g, "<code>$1</code>")
.replace(/^# (.*$)/gm, "<h2>$1</h2>")
.replace(/^## (.*$)/gm, "<h3>$1</h3>")
.replace(/^\* (.*$)/gm, "• $1")
.replace(/\n/g, "<br>")
}
</div>
`;

chat.scrollTop = chat.scrollHeight;

}catch(erro){

document.getElementById("loading").innerHTML =
"Erro ao conectar IA.";

}

}
