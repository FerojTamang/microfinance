const { sequelize, DataTypes } = require('../Database/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});
//begineer mistake here , true rakheu vane chai harek choti hunxa migrate true garni vaneko change garni bela matrai true garni ho natra false rakhera chodni ho hamle yo mathi column name haru change garda kheri

User.sync({ alter : true })
  .then(() => console.log('User table synced successfully'))
  .catch(err => console.error('Error syncing User table:', err));

module.exports = User;