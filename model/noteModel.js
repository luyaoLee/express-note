var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

//检查是否与数据库已经建立连接
// sequelize.authenticate().then(function() {
//     console.log('Connection has been established successfully.');
// }).catch(function(err) {
//     console.error('Unable to connect to the database:', err);
// });

//建表
var noteModel = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.STRING
    },
    updatedAt: {
        type: Sequelize.STRING
    }
}, {timestamps: false});

//noteModel.sync({force: true})
module.exports = noteModel;
