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
        models.user.hasOne(models.boards);
    }
    return User;
}