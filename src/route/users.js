const express = require('express');
const router = express.Router();
const models = require("../modules")

const User = models.user;

// const check_sequelize_auth = async () =>{
//     try {
//         await sequelize.authenticate();
//         console.log("연결성공");
//     } catch (error) {
//         console.log("연결실패", err);
//     }
// };

// check_sequelize_auth();

// const User = sequelize.define("user",{
//     name:{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     password:{
//         type: Sequelize.INTEGER,
//         allowNull:false
//     }
// });

User.sync({force : true}).then(()=>{
    return User.create({
        name : "홍길동",
        password : '1234'
    });
});


router.get('/', async(req, res) =>{
    let result = await User.findAll();
    res.send(result);
});

router.get('/:id',async(req, res)=>{
    let result = await User.findOne({
        attributes:["name"],
        where : {
            id:req.params.id
        }
    });

    res.send(result);
});

router.post('/',async(req, res)=>{
   let result = true;
   try {
       await User.create({
           id:req.body.id, name: req.body.name, password : req.body.password
       });
   } catch (error) {
       console.log(error);
   }
   console.log(result);
   res.send(result);
});

router.put('/:id',async(req, res)=>{
    // const check_user = await User.findOne({
    //     where:{
    //         password:req.params.id
    //     }
    // });
    
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