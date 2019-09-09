const express = require('express');
const _ = require("lodash");
const app = express();

let users=[{
    id : 1,
    name: '홍길동'
},{
    id : 2,
    name : '장형수'
}];
let user = null;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000);

app.get('/users', (req, res) =>{
let msg = '유저가 존재하지 않습니다';
if(users.length>0){
    msg = users.length+'명의 유저가 존재합니다';
}
res.send({msg, result: users});
});

app.get('/users/:id',(req, res)=>{
 let msg = 'id가' +req.params.id+"인 유저가 존재하지 않습니다";
 let user = _.find(users, ["id", parseInt(req.params.id)]);
 if(user){
     msg = '성공적으로 조회하였습니다';
 }
 res.send({msg, result: user});
});

app.post('/users',(req, res)=>{
   const check_user = _.find(users,['id', users.id]);
   let msg = req.body.id+'아이디를 가진 유저가 이미 존재합니다.';
   let success = false;
   if(!check_user){
       users.push(req.body);
       msg = req.body.name +' 유저를 새로 추가했습니다';
       success = true;
   }
   res.send({msg, success});
});

app.put('/users/:id',(req, res)=>{
    msg = '유저의 이름을 '+req.body.name+' 으로 수정하였습니다'
    if(users.id === req.body.id){
        users.name = req.body.name;
    }else{
        msg = '존재하지 않는 유저입니다.';
    }
    res.send(msg);
});


app.delete('/users/:id',(req, res)=>{
    if(user.id == req.params.id){
        user = null;
        res.send('user delete'+user.id);
    }else{
    res.send('user id'+req.param.id+' 존재하지 않습니다');
    }
   
});