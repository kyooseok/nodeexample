module.exports = (sequelize, DataType)=>{
    const Board = sequelize.define("boards",{
        content :{
            type : DataType.STRING,
            allowNull : false 
        }
    });
    return Board;
}