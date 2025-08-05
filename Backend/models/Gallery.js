// backend/models/Gallery.js
const { sequelize, DataTypes } = require('../Database/connection');
const User = require('./User');

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'gallery',
  timestamps: true,
});

Gallery.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

if (process.env.NODE_ENV === 'development') {
  Gallery.sync({ alter: true })
    .then(() => console.log('Gallery table synced successfully'))
    .catch(err => console.error('Error syncing Gallery table:', err));
}

module.exports = Gallery;