import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("employees", {
      id       : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT
      },
      name     : {
        type     : Sequelize.STRING,
        allowNull: false
      },
      email    : {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      mobile_no: {
        type     : Sequelize.STRING,
        allowNull: false,
        unique   : true,
      },
      aadhar_no: {
        type     : Sequelize.STRING,
        allowNull: false,
        unique   : true,
      },
      driver_license: {
        type      : Sequelize.STRING,
        allowNull : true
      },
      category: {
        type      : Sequelize.STRING,
        allowNull : false
      },
      state   : {
        allowNull : false,
        type      : Sequelize.STRING
      },
      city   : {
        allowNull : false,
        type      : Sequelize.STRING
      },
      area   : {
        allowNull : false,
        type      : Sequelize.STRING
      },
      location   : {
        allowNull : false,
        type      : Sequelize.STRING
      },
      pincode    : {
        allowNull : false,
        type      : Sequelize.INTEGER
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
      queryInterface.dropTable("employees"),
    ]);
  }
};
