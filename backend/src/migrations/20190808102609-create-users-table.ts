import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("users", {
      id          : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      name        : {
        type     : Sequelize.STRING,
        allowNull: true
      },
      email       : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: true
      },
      mobile_no   : {
        type     : Sequelize.STRING,
        allowNull: false,
        unique   : true,
      },
      alternate_no: {
        type     : Sequelize.STRING,
        allowNull: true,
        unique   : true,
      },
      address     : {
        allowNull: true,
        type     : Sequelize.STRING
      },
      landmark    : {
        allowNull: true,
        type     : Sequelize.STRING
      },
      state       : {
        allowNull: true,
        type     : Sequelize.STRING
      },
      city_id     : {
        allowNull : false,
        type      : Sequelize.BIGINT,
        references: {
          model: "cities",
          key  : "id"
        }
      },
      location_id : {
        allowNull : false,
        type      : Sequelize.BIGINT,
        references: {
          model: "locations",
          key  : "id"
        }
      },
      area_id     : {
        allowNull : true,
        type      : Sequelize.BIGINT,
        references: {
          model: "areas",
          key  : "id"
        }
      },
      pincode     : {
        allowNull: true,
        type     : Sequelize.INTEGER
      },
      is_active   : {
        allowNull: false,
        type     : Sequelize.BOOLEAN
      },
      createdAt   : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      updatedAt   : {
        allowNull: true,
        type     : Sequelize.DATE
      },
      deletedAt   : {
        allowNull: true,
        type     : Sequelize.DATE
      }
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.dropTable("users"),
    ]);
  }
};
