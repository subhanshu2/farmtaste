import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("cities", {
      id       : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      title    : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      slug     : {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type     : Sequelize.STRING,
        allowNull: true
      },
      is_active: {
        allowNull: false,
        type     : Sequelize.BOOLEAN
      } ,
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
      queryInterface.dropTable("cities"),
    ]);
  }
};
