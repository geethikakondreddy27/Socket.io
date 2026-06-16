const express = require("express");
const http = require("http");
const cors = require("cors");
const{Server}=require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log("User Connected:",socket.id);
    socket.on("send-message",(data)=>{
        io.to(data.room).emit("receive-message",data);
    });
    socket.on("disconnect",()=>{
        console.log("User Disconnected:",socket.id);
    });

    socket.on("typing",(data)=>{
        socket.to(data.room).emit("show-typing",{username:data.username,room:data.room});
    });
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`${socket.id}joined ${room}`);
    });



});

app.get("/",(req,res)=>{
    res.send("Socket Server Running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});