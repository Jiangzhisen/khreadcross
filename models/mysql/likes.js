const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    like_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "like_id_UNIQUE"
    },
    post_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "like_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_id" },
        ]
      },
    ]
  });
};
