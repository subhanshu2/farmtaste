import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("products", {
      id             : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      title          : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      slug           : {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      sub_category_id: {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "product_sub_categories",
          key  : "id"
        },
        onDelete  : "cascade"
      },
      image_url      : {
        type     : Sequelize.STRING,
        allowNull: true
      },
      createdAt      : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      updatedAt      : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      deletedAt      : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.dropTable("products"),
    ]);
  }
};
