import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("pre-users", {
      id       : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      mobile_no    : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      otp    : {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type     : Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type     : Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.dropTable("pre-users"),
    ]);
  }
};
