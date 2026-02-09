module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      commentMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return Comment ;
  };