module.exports = (sequelize, DataType)=>{
    const Board = sequelize.define("boards",{
        content :{
            type : DataType.STRING,
            allowNull : false 
        }
    });

    Board.associate = function(models){
        models.boards.belongsTo(models.user);
    }
    return Board;
}