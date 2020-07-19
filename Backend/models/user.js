const user = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
    	defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    username : DataTypes.STRING,
    email: {
      allowNull: false,
      type : DataTypes.STRING,
      unique : true 
    },
    password: {
      allowNull: false,
      type : DataTypes.STRING 
    }, 
    role: {
      type: DataTypes.ENUM,
      values: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      allowNull: false,
      defaultValue : 'USER'
    }  
  }, {});

  user.associate = function(models) {
  	user.hasMany(models.post, {
    	foreignKey : "user_id"
    });
  };

  return user;
};

export default user;
