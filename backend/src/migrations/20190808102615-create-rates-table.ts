import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("rates", {
      id        : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      city_id   : {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "cities",
          key  : "id"
        },
        onDelete  : "cascade"
      },
      product_id: {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "products",
          key  : "id"
        },
        onDelete  : "cascade"
      },
      rate      : {
        type     : Sequelize.FLOAT,
        allowNull: false
      },
      createdAt : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      updatedAt : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      deletedAt : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.dropTable("rates"),
    ]);
  }
};
