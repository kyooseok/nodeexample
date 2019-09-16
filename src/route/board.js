const express = require('express');
const board = express.Router();
const _ = require('lodash');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_example", "root", "903956", {host : "localhost", dialect:"mysql"});

const check_sequelize_auth = async () =>{
    try {
        await sequelize.authenticate();
        console.log("연결성공");
    } catch (error) {
        console.log("연결실패", err);
    }
};

check_sequelize_auth();

const Board = sequelize.define("board",{
    title:{
        type : Sequelize.STRING,
        allowNull: false
    },
    content:{
        type : Sequelize.STRING,
        allowNull: false
    },
    viewcount:{
        type : Sequelize.STRING,
        allowNull: false
    }
});

Board.sync({force : true})
    .then(()=>{
    return Board.create({
        title : "이름",
        content: "김유석",
        viewcount : "1"
    });
});


board.get('/', async(req,res)=>{
    let result = await Board.findAll();
    res.send(result);
});

board.get('/:id', async(req,res)=>{
    let result = await Board.findOne({
        attributes:["content"],
        where:{
             viewcount : req.params.id
        }
    })
    res.send(result);
});

board.post('/', async(req,res)=>{
    let result = true;
   try {
       await Board.create({
           title:req.body.title, content: req.body.content, viewcount : req.body.viewcount
       });
   } catch (error) {
       console.log(error);
   }
   console.log(result);
   res.send(result);
});

board.put('/:id', async(req,res)=>{
    let msg; 
    try {
        await Board.update({
            content : req.body.content
        }, {
            where:{
                viewcount:req.params.id
            }
        });
        msg = '유저를 찾아서 '+req.body.content+' 으로 바뀌었습니다.';
    } catch (error) {
        console.log("유저를 찾을수 없습니다",error);
    }
    res.send(msg);
    }
);

board.delete('/:id', async(req,res)=>{
    let msg;
   
    try {
        await Board.destroy({    
            where:{
                viewcount:req.params.id
            }
        }); 
       msg = req.params.id+" 를 가진 유저를 삭제하였습니다."
    } catch (error) {
        console.log(error);
    }

    res.send(msg);
});

module.exports = board;
