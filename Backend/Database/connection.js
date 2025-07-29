const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgresql://postgres.sxqkhzpejtlickxvzcqo:Finance123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres");

sequelize.authenticate()
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.error("DB connection failed ❌", err));

module.exports = { sequelize, DataTypes };
