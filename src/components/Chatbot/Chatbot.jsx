import { useState } from "react" 
const Chatbot = () => {
let product
const [input, setInput] = useState("");
let handleChange = (e) => {
  e.preventDefault();
  setInput(e.target.value)
}


const utterances = [ 
  ["how are you", "how is life", "how are things"],        //0
  ["hi", "hey", "hello", "good morning", "good afternoon"],      //1
  ["what are you doing", "what is going on", "what is up"],      //2
  ["how old are you"],					//3
  ["who are you", "are you human", "are you bot", "are you human or bot"],   //4
]

const answers = [
  [
   "Fine... how are you?",
   "Pretty well, how are you?",
   "Fantastic, how are you?"
 ],                                                                                  	//0
 [
   "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"
 ],						//1
 [
   "Nothing much",
   "About to go to sleep",
   "Can you guess?",
   "I don't know actually"
 ],						//2
 ["I am infinite"],					//3
 ["I am just a bot", "I am a bot. What are you?"],	//4
 

];

// For any other user input

const alternatives = [
 "Go on...",
 "Try again",
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
