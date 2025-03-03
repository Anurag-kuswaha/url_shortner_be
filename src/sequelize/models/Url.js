const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Urls extends Model {
    static associate(models) {
      Urls.hasMany(models.Analytics, { foreignKey: "urlId", onDelete: "CASCADE" });
    }
  }
  Urls.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      short_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      original_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Urls",
      tableName: "urls",
    }
  );
  return Urls;
};
