const express = require('express');
const router = express.Router();
const models = require("../modules");

const User = models.user;
const Board = models.boards;



router.get('/', async(req, res) =>{
    let result = await User.findAll({
        include:[Board]
    });
    res.send(result);
});

router.get('/:id',async(req, res)=>{
    let result = await User.findOne({
        where : {
            id:req.params.id
        }
    });

    res.send(result);
});

router.post('/',async(req, res)=>{
   let result = true;
   try {
      let result_user = await User.create({
          name: req.body.name,
          address:req.body.address
       });
      await result_user.createBoard({content:"test"});
   } catch (error) {
       console.log(error);
   }
   console.log(result);
   res.send(result);
});

router.put('/:id',async(req, res)=>{
    
    let msg;
    
        
    try {
        await User.update({
            name : req.body.name
        }, {
            where:{
                id:req.params.id
            }
        });
        msg = '유저를 찾아서 '+req.body.name+' 으로 바뀌었습니다.';
    } catch (error) {
        console.log("유저를 찾을수 없습니다",error);
    }
    res.send(msg);
    }
    

);


router.delete('/:id',async(req, res)=>{
    
    
    let mag;
   
        
        try {
            await User.destroy({
                where:{
                    id:req.params.id
                }
            });
           mag = req.params.id+" 를 가진 유저를 삭제하였습니다."
        } catch (error) {
            console.log(error);
        }
    
   res.send(mag);
});

module.exports = router;