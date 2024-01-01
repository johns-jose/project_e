const express = require('express')
const app = express()



 const server = app.listen(8000,()=>{
    console.log('server is running')

    const io = require('socket.io')(server,{
        cors:{
            origin:'http://localhost:3000'
        }
    })
    io.on('connection',(socket)=>{
        console.log('a user connected')
        socket.on('disconnect',()=>{
            console.log('user disconnected')
        })
    })
})