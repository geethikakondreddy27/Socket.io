import {useState,useEffect} from "react";
import socket from "./socket";
import "./App.css";

function App(){

const [username,setUsername] = useState("");
const [joined,setJoined] = useState(false);

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const [typingUser,setTypingUser] = useState("");

  const [room , setRoom] = useState("General");

  useEffect(()=>{
    socket.on("receive-message",(msg)=>{
      setMessages((prev)=>[...prev,msg]);
    });
     socket.on("show-typing",(data)=>{
      if(data.room === room){
         setTypingUser(data.username);
        setTimeout(()=>{
        setTypingUser("");
      },1000);
      }
      
      
     });


    return ()=>{
      socket.off("receive-message");
      socket.off("show-typing");
    };
  },[]);

  const sendMessage =()=>{
    if (!message.trim()) return;
    socket.emit("send-message",{username,message,room});
    setMessage("");
  };


if(!joined){
  return(
    <div className="join-container">
      <div className="join-card">
        <h1 className="join-title">Join Chat</h1>
          
         <input 
           className="join-input"
           type="text"
           placeholder="Enter Username"
           value={username}
          onChange={(e)=>setUsername(e.target.value)}

          />
         <select 
         className="join-select"
         value={room}
         onChange={(e)=>setRoom(e.target.value)}
         
         
         >
          <option value="General">General</option>
          <option value="Tech Support">Tech Support</option>


         </select>
 
           
<button
        className="join-btn"
        onClick={()=>{
          socket.emit("join-room",room);
          setJoined(true);
        }}
      >
        Join Room
      </button>

      </div>


    </div>
  );
}




 return (
   <div className="chat-container">

    <h1 className="chat-title">Socket.io Chat</h1>
    <div className="room-badge">
    Room:{room} 
    </div>
   <div className="input-section">
   <input  className="message-input"
   type="text"
   value={message}
   onChange={(e)=>{
    setMessage(e.target.value);
          socket.emit("typing",{username,room});
   }}
   placeholder="Enter message"
   />

   <button className="send-btn"
             onClick={sendMessage}>
              Send

   </button>

   </div>

   <p className="typing-indicator">
     {typingUser && `${typingUser} is typing...`}
   </p>


   <div className="messages-container">
    {messages.map((msg,index)=>(
        <div className="message-card" key={index}>
          <strong>{msg.username}</strong>: {msg.message}
        </div>
      ))}
   
   </div>

   </div>
  
 );


}

export default App;