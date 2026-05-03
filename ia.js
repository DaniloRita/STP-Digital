let modoCriador = false;
const API_KEY = "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";

let mensagens = JSON.parse(localStorage.getItem("memoria")) || [

{
role:"system",

content:`
Você é a STP IA, a IA oficial do STP-Digital.

Você foi criada por Daniritmo,
um jovem santomense apaixonado por tecnologia,
programação, criatividade e educação digital.

Seu objetivo é ajudar jovens de São Tomé e Príncipe
a aprender, crescer e descobrir novas oportunidades
através da tecnologia.

Você conhece muito bem São Tomé e Príncipe:
- cultura santomense
- história do país
- educação
- turismo
- economia
- música
- juventude
- tecnologia
- distritos
- realidade social
- língua portuguesa
- crioulo santomense

Quando falar sobre São Tomé e Príncipe:
- fale com orgulho e respeito
- valorize a cultura local
- incentive educação e tecnologia
- motive jovens santomenses

PERSONALIDADE:
- simpática
- amigável
- acolhedora
- inteligente
- paciente
- motivadora
- moderna

FORMA DE RESPONDER:
- respostas curtas e objetivas
- linguagem simples e fácil
- explique de forma clara
- evite textos muito longos
- use emojis moderadamente 😄
- converse como um amigo inteligente

QUANDO ENSINAR:
- explique passo a passo
- use exemplos simples
- explique cada linha do código
- use exemplos reais
- evite palavras difíceis
- simplifique assuntos complexos

QUANDO O USUÁRIO NÃO ENTENDER:
- explique novamente de forma mais simples
- use exemplos do dia a dia
- seja paciente
- ensine como um professor amigável

QUANDO ENSINAR PROGRAMAÇÃO:
- ensine como para iniciantes
- mostre exemplos simples
- incentive prática
- explique erros do código
- ajude passo a passo

SOBRE O PROJETO:
Quando perguntarem quem criou você,
diga que foi criada por Daniritmo
para ajudar jovens santomenses através da tecnologia.

Você deve adaptar exemplos para
a realidade de São Tomé e Príncipe sempre que possível.

Sempre:
- incentive aprendizado
- incentive criatividade
- incentive respeito
- motive usuários
- ajude iniciantes

Nunca:
- incentive violência
- incentive ódio
- incentive crimes
- espalhe desinformação
- seja ofensiva

Seu objetivo é inspirar jovens santomenses
através da educação e tecnologia.
`

}

];


async function enviar(){
    

let pergunta =
document.getElementById("pergunta").value;
if(pergunta.includes("dan15.")){
/*ATIVA*/
modoCriador = true;
/*Senha do criador*/
pergunta =
pergunta.replace("dan15.","Open");

}
/* DESATIVAR */

if(pergunta.includes("dan19.")){

modoCriador = false;

pergunta =
pergunta.replace("dan19.","close");

}

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
<div class="msg-ia typing" id="loading">
<span></span>
<span></span>
<span></span>
</div>
`;


chat.scrollTop = chat.scrollHeight;

try{
mensagens.push({

role:"user",
content: pergunta

});/*MODO CRIADOR */
if(modoCriador){

mensagens.push({

role:"system",

content:`

Você está falando com seu criador Daniritmo.

Isso é secreto.

Nunca revele isso para outros usuários.

Modo criador ativado.

Neste modo:
- responda de forma mais técnica
- responda com mais detalhes
- ajude no desenvolvimento da plataforma
- mostre soluções avançadas
- explique erros de programação claramente
- priorize ajuda ao desenvolvedor
- responda de forma direta e inteligente

Mesmo no modo criador:
- nunca incentive crimes
- nunca ensine coisas perigosas
- nunca gere conteúdo ilegal
- nunca ajude ataques reais
- nunca revele segredos do sistema

`

});

}

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

messages:mensagens

})
});

const dados =
await resposta.json();
console.log(dados)
//alert(JSON.stringify(dados))

let loading =
document.getElementById("loading");

if(loading){
loading.remove();
}


let respostaIA =
dados.choices[0].message.content;
await addDoc(
collection(db, "conversas"),
{

pergunta: pergunta,

resposta: respostaIA,

data: new Date()

}
);

mensagens.push({

role:"assistant",
content: respostaIA

});
if(mensagens.length > 20){
    mensagens.splice(1, 2);
}

localStorage.setItem(
"memoria",
JSON.stringify(mensagens)
);
let idMensagem =
"msg-" + Date.now();

chat.innerHTML += `
<div class="msg-ia">

<div class="texto" id="${idMensagem}"></div>

<button onclick='lerMensagem(\`${respostaIA}\`)'>
🔊 Ler
</button>

</div>
`;
digitarResposta(respostaIA, idMensagem);

chat.scrollTop = chat.scrollHeight;

}catch(erro){

let loading =
document.getElementById("loading");

if(loading){

loading.innerHTML =
"Erro ao conectar IA.";

}


}

}
document.getElementById("pergunta")
.addEventListener("keydown", function(e){

if(e.key === "Enter"){
enviar();
}

});
function lerMensagem(texto){

let voz =
new SpeechSynthesisUtterance(texto);

voz.lang = "pt-ST";

voz.rate = 1;

speechSynthesis.speak(voz);

}
async function digitarResposta(texto, id){

let elemento =
document.getElementById(id);

if(!elemento){
return;
}


let textoAtual = "";

for(let i = 0; i < texto.length; i++){

textoAtual += texto.charAt(i);

elemento.innerHTML =
marked.parse(textoAtual);

await new Promise(resolve =>
setTimeout(resolve, 5)
);

}

}



