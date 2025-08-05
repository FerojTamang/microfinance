// backend/models/News.js
const { sequelize, DataTypes } = require('../Database/connection');
const User = require('./User');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'news',
  timestamps: true,
});

// Relationship: News belongs to a User (created_by)
News.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

if (process.env.NODE_ENV === 'development') {
  News.sync({ alter: true })
    .then(() => console.log('News table synced successfully'))
    .catch(err => console.error('Error syncing News table:', err));
}

module.exports = News;