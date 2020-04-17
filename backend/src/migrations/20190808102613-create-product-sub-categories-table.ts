import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("product_sub_categories", {
      id         : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      title      : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      slug       : {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "product_categories",
          key  : "id"
        },
        onDelete  : "cascade"
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
      queryInterface.dropTable("product_sub_categories"),
    ]);
  }
};
