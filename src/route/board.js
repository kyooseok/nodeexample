const express = require('express');
const board = express.Router();


board.get('/', (req,res)=>{
    res.send('get');
});

board.get('/', (req,res)=>{
    res.send('getIn');
});

board.post('/', (req,res)=>{
    res.send('post');
});

board.put('/', (req,res)=>{
    res.send('put');
});

board.delete('/', (req,res)=>{
    res.send('delete');
});

module.exports = board;
