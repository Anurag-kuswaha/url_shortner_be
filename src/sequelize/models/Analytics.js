const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Analytics extends Model {
    static associate(models) {
      Analytics.belongsTo(models.Urls, {
        foreignKey: "urlId",
        onDelete: "CASCADE",
      });
    }
  }
  Analytics.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ip: { type: DataTypes.STRING },
      user_agent: { type: DataTypes.STRING },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Analytics",
      tableName: "analytics",
    }
  );
  return Analytics;
};
