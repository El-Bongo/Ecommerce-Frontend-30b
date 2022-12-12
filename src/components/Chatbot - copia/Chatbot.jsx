import './Chatbot.css'
const Chatbot = () => {

  return(
<>
<div id="container" className="container">
  <img src="https://cdn.pixabay.com/photo/2020/01/02/16/38/chatbot-4736275_960_720.png" height="400vh" alt="Chatbot clipart"/>
   <div id="chat" className="chat">
    <div id="messages" className="messages"></div>
    <input id="input" type="text" placeholder="Write something..." autoComplete="off" autoFocus={true} />
  </div>
</div>
</>

 )
}
export default Chatbot;
