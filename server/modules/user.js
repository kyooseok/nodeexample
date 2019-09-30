module.exports = (sequelize, DataType)=>{
    
    const User = sequelize.define("user",{
        name :{
            type : DataType.STRING,
            allowNull : false 
        },
        address:{
            type : DataType.STRING,
            allowNull : false
        }
    });

    User.associate= function(models){
        models.user.belongsTo(models.boards);
    }
    return User;
}