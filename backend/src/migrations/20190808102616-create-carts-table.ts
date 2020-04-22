import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("carts", {
      id         : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      user_id    : {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "users",
          key  : "id"
        },
        onDelete  : "cascade"
      },
      product_id : {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "products",
          key  : "id"
        },
        onDelete  : "cascade"
      },
      no_of_units: {
        type     : Sequelize.INTEGER,
        allowNull: false,
      },
      rate       : {
        type     : Sequelize.FLOAT,
        allowNull: false
      },
      createdAt  : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      updatedAt  : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      deletedAt  : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.dropTable("carts"),
    ]);
  }
};
