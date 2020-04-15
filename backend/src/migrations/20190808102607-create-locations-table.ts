import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("locations", {
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
      city_id  : {
        type      : Sequelize.BIGINT,
        allowNull : false,
        references: {
          model: "cities",
          key  : "id"
        },
        onDelete: "cascade"
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
      queryInterface.dropTable("locations"),
    ]);
  }
};
