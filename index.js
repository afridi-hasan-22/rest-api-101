const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const shortid = require('shortid');
const fs = require('fs/promises');
const path = require('path')
require('dotenv').config();
const dbPath = path.resolve('data', 'db.json');


const server = express();

server.use([morgan('dev'), cors(), express.json()]);

server.get('/health', (req,res)=> {
    res.status(200).send('Success');
});

//create data
server.post('/', async (req,res) => {
    const player = {
        ...req.body,
        id : shortid.generate()
    }
    
    const data = await fs.readFile(dbPath);
    const players = JSON.parse(data);
    players.push(player);
    await fs.writeFile(dbPath, JSON.stringify(players))
    res.status(201).json(player)
})

server.get('/', async (req,res)=> {
    const data = await fs.readFile(dbPath);
    
})












//global error handeler
server.use((req,res,next)=> {
    const error = new Error('Afridi, kichu ekta vul hoise');
    error.status = 404;
    next(error)
})

server.use((error,req,res,next)=> {
    if(error.status){
     return res.status(error.status).json({
        message : error.message
     })
    }
    res.status(500).json({message : 'Something went wrong'})
})


const port = process.env.PORT || 4000
server.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`);
})