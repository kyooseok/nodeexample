const express = require('express');
const app = express();
const user_router = require('./route/users');
const board_router = require('./route/board');
const models = require("./modules");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", user_router);
app.use('/board', board_router);

models.sequelize.sync().then(()=>{
    app.listen(3000);
})


app.get("/", (req,res)=>{
    res.send('hello world');
});


