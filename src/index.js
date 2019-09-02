const express = require('express');
const app = express();

app.listen(3000);

app.get('/', (req, res) =>{
    let a=5;
    let b=5;
    let c=a+b;
    res.send(c.toString());
    console.log('server on');
});