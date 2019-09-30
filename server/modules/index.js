const fs = require("fs");//filesystem 불러옴
const path = require("path");//path 불러옴
const basename = path.basename(__filename);//path의 기본 폴더를 불러와서 세팅
const Sequelize = require("sequelize");//sequelize 불러옴

const db ={};//기본 db저장 객체 생성

const sequelize = new Sequelize("node_example", "root", "903956", {
    host:"localhost", dialect:"mysql"
}); // sequelize 변수에 Sequelize의 기본 환경설정 초기화

sequelize.authenticate().then(()=>{
    console.log("연결성공");
}).catch(err=>{
    console.log("연결실패",err);
});

fs.readdirSync(__dirname).filter(file=>{ //readiireSync => 디렉토리 읽어옴, _dirname :현제 티렉토리에 있는 파일이름
    return (file.indexOf('.') !== 0) &&(file !==basename) && (file.slice(-3) === ".js");
}).forEach(file =>{
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
});

Object.keys(db).forEach(modelName=>{
    if(db[modelName].associate){
        db[modelName].associate(db);
    };
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;