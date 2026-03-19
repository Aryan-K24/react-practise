import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import './App.css'


function ChatbotInput({chatMessages,setChatMessages}){

  const [inputText,setInputText] = React.useState('');

  function handleInput(event){
    setInputText(event.target.value);
  }

  function sendMessage(){

    if(inputText === '') return;

    const response = Chatbot.getResponse(inputText);

    setChatMessages([
      ...chatMessages,
      {
        message:inputText,
        sender:"user",
        id:crypto.randomUUID()
      },
      {
        message:response,
        sender:"chatbot",
        id:crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return(
    <div className="textbox-container">

      <input
        className="textbox"
        placeholder="Send a msg to the chatbot"
        value={inputText}
        onChange={handleInput}
      />

      <button
        className="send-button"
        onClick={sendMessage}
      >
      Send
      </button>

    </div>
  );
}



/* SINGLE MESSAGE */

function ChatMessage({message,sender}){

  return(

    <div className={
      sender === "user"
      ? "msg-user"
      : "msg-chatbot"
    }>

      {sender === "chatbot" &&
        <img src="IMG_3016.jpg" className="profile-pic"/>
      }

      <div className="chat-message">
        {message}
      </div>

      {sender === "user" &&
        <img src="BLUE WHALE.jpg" className="profile-pic"/>
      }

    </div>

  );
}



/* MESSAGE LIST */

function ChatMessages({chatMessages}){

  const messagesRef = useRef(null);

  useEffect(()=>{
    const container = messagesRef.current;
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  },[chatMessages]);

  return(

    <div className="messages-container" ref={messagesRef}>

      {chatMessages.map((chatMessage)=>(
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}

    </div>

  );
}



function App(){

  const [chatMessages,setChatMessages] = useState([
    {message:"hello chatbot",sender:"user",id:"1"},
    {message:"hello! How are you doing?",sender:"chatbot",id:"2"},
    {message:"Can you get me today's date?",sender:"user",id:"3"},
    {message:"Today is February 19th",sender:"chatbot",id:"4"}
  ]);


  return(

    <div className="app-container">

      <ChatbotInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <ChatMessages
        chatMessages={chatMessages}
      />

    </div>

  );
}

export default App
