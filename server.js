const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const http=require("http").createServer(app);

app.use(express.static(__dirname+"/public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

http.listen(port,()=>{
    console.log(`your server is running on http://localhost:${port}`)
});


// socket
const io=require("socket.io")(http)

io.on("connection",(socket)=>{
    console.log("connected...");
    socket.on("message",(message)=>{
        socket.broadcast.emit("message",message)
    });
})
