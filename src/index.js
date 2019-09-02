const express = require('express');
const app = express();

let users=[];
let user = null;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000);

app.get('/users', (req, res) =>{
    res.send("user"+user.name+'get');
});

app.get('/users/:id',(req, res)=>{
    if(user.id == req.params.id){
        res.send('user'+user.name+'get');
    }
    res.send('user id'+req.param.id+'존재하지 않습니다');
});

app.post('/users',(req, res)=>{
    user =req.body;
    res.send('user '+user.name+'추가');
});

app.put('/users/:name',(req, res)=>{
    user = req.body;
    if(user.name == req.params.name){
        res.send('user 이름 '+user.name+' 수정');
    }
    res.send('user name'+req.param.name+'존재하지 않습니다');
});


app.delete('/users/:id',(req, res)=>{
    user= req.body;
   
    if(user.id == req.params.id){
        res.send('user delete'+user.id);
    }
    res.send('user id'+req.param.id+'존재하지 않습니다');
   
});