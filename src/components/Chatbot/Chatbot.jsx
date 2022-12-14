import { useState } from "react" 
const Chatbot = () => {
let product
const [input, setInput] = useState("");
let handleChange = (e) => {
  e.preventDefault();
  setInput(e.target.value)
}


const utterances = [ 
  ["como estas", "todo bien", "que tal"],        //0
  ["hola", "hey", "hello", "buen dia", "buenas tardes", "buenas noches"],      //1
  ["si necesito ayuda", "estoy perdido", "ayuda"],      //2
  ["respecto a compras"],					//3
  ['respecto a servicio al cliente'],   //4
  ['quiero hablar con un humano'], //5
  ['metamask'], //6
] 

const answers = [
  [
   "Estoy bien, ¿tienes alguna consulta?",
   "Me encuentro bastante bien, ¿quieres consultar algo?",
   "Estoy maravillosamente bien, ¿necesitas algo?"
 ],                                                                                  	//0
 [
   "¡Hola! Soy el bot de ayuda de Tienda Tech, ¿que necesitas?", "¡Buen día! Soy el bot de ayuda de Tienda Tech, ¿que necesitas?", "¡Que tal! Soy el bot de ayuda de Tienda Tech, ¿que necesitas?"
 ],						//1
 [
   "¡Con gusto te ayudaré! Responde uno de los siguientes mensajes para que te de más información. 1) 'Respecto a compras', 2) 'Respecto a servicio al cliente', 3) Quiero hablar con un humano",
 ],						//2
 ["Respecto a las compras: Existen dos metodos de pago actualmente en el sitio web, Crypto mediante Metamask, y por Mercadopago, para más información sobre Metamask escribe 'Metamask', si necesitas explicación más avanzada, escribe 'Quiero hablar con un humano'"],					//3
 ["Para quejas referidas al servicio al cliente, envia un email a nonosimporta@gmail.com"],	//4
 ["Lamento no haber sido de suficiente ayuda, puedes dirigirte a un humano mediante discord -inserte discord aquí- o Whatsapp -inserte numero whatsapp aqui-"], //5
 ["¡Aquí tienes un vídeo introductorio sobre Metamask! https://www.youtube.com/watch?v=xuY5kJavZbc"], // 6
 

];

// For any other user input

const alternatives = [
 "No entendí, prueba diciendo 'ayuda'",
 "Lo siento, no entendí lo que quisiste decir, prueba diciendo 'ayuda'",
];

let handleSubmit = (e) => {
  e.preventDefault()
  var respuesta = output(input)
  addUserEntry(input)
  addBotEntry(respuesta) 

}

 function compare(utterancesArray, answersArray, string) {
    let item;
    for (let x = 0; x < utterancesArray.length; x++) {
      for (let y = 0; y < utterancesArray[x].length; y++) {
        if (utterancesArray[x][y] === string) {
          let items = answersArray[x];
          item = items[Math.floor(Math.random() * items.length)];
          }
        }
     }
    return item;
  }

  function addUserEntry(input) {
    let userDiv = document.getElementById('chat');
    let userText = document.createElement('div')
    userDiv.appendChild(userText);
    userText.innerHTML = `Tu: ${input}`;
    }
    function addBotEntry(product) {
    let botDiv = document.getElementById('chat');
    let botText = document.createElement('div');
    botText.innerText = "Bot: Typing...";
    botDiv.appendChild(botText);
    setTimeout(() => {
      botText.innerText = `Bot: ${product}`;
    }, 2000); }
    


  function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
   
    if (compare(utterances, answers, text)) {
      product = compare(utterances, answers, text);
    } 
    else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    return product
  }

  return(
<>
<div id="container" className="container">
   <div id="chat" className="chat">
    <div id="messagesUser" className="messagesUser">
    <span id = "textUser"></span>
    </div>
    <div id="messagesBot" className="messagesBot">
    <span id = "textBot"></span>
    </div>
    <form onSubmit={handleSubmit}>
    <input id="input" type="text" placeholder="Write something..." autoComplete="off" onChange={handleChange} />
    </form>
  </div>
</div>

</>

 )
}
export default Chatbot;
