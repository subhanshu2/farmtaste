import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("employee_categories", {
      id       : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      title     : {
        type     : Sequelize.STRING,
        allowNull: false
      },
      slug : {
        type      : Sequelize.STRING,
        allowNull : false,
      },
      is_active  : {
        allowNull : false,
        type      : Sequelize.BOOLEAN
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
      queryInterface.dropTable("employee_categories"),
    ]);
  }
};
