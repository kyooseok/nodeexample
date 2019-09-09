const express = require('express');
const router = express.Router();
const _ = require('lodash');

let users=[{
    id : 1,
    name: '홍길동'
},{
    id : 2,
    name : '장형수'
}];



router.get('/', (req, res) =>{
let msg = '유저가 존재하지 않습니다';
if(users.length>0){
    msg = users.length+'명의 유저가 존재합니다';
}
res.send({msg, result: users});
});

router.get('/:id',(req, res)=>{
 let msg = 'id가' +req.params.id+"인 유저가 존재하지 않습니다";
 let user = _.find(users, ["id", parseInt(req.params.id)]);
 if(user){
     msg = '성공적으로 조회하였습니다';
 }
 res.send({msg, result: user});
});

router.post('/',(req, res)=>{
   const check_user = _.find(users,['id', parseInt(req.params.id)]);
   let msg = req.body.id+'아이디를 가진 유저가 이미 존재합니다.';
   let success = false;
   if(!check_user){
       users.push(req.body);
       msg = req.body.name +' 유저를 새로 추가했습니다';
       success = true;
   }
   res.send({msg, success});
});

router.put('/:id',(req, res)=>{
    const check_user = users.map((entry)=>{
        if(entry.id === parseInt(req.params.id)){
            entry = true;
        }else{
            entry = false;
        }
        return entry;
    })
    msg = '유저를 찾을수 없습니다';
    
    if(check_user){
       users= users.map((entry)=>{
            if(entry.id === parseInt(req.params.id)){
                entry.name = req.body.name;
                msg = '유저의 이름을 '+req.body.name+' 으로 수정하였습니다';
            }
            return entry;
        })
    }
    res.send(msg);
});


router.delete('/users/:id',(req, res)=>{
    let check_user = _.find(users,["id", parseInt(req.params.id)]);
    let msg = req.params.id+" 아이디를 가진 유저가 존재하지 않습니다";
    if(check_user){
        msg = '성공적으로 삭제하였습니다';
        // users = _.reject(users, ["id", parseInt(req.params.id)]);
        
    }
   res.send(msg);
});

module.exports = router;