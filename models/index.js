const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('khreadcross', process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOSTNAME,
    dialect: 'mysql'
});

const users = require('./mysql/users')(sequelize, Sequelize);
const posts = require('./mysql/posts')(sequelize, Sequelize);
const notifications = require('./mysql/notifications')(sequelize, Sequelize);
const likes = require('./mysql/likes')(sequelize, Sequelize);
const follows = require('./mysql/follows')(sequelize, Sequelize);
const feedbacks = require('./mysql/feedbacks')(sequelize, Sequelize);
const comments = require('./mysql/comments')(sequelize, Sequelize);

module.exports = {
  users,
  posts,
  notifications,
  likes,
  follows,
  feedbacks,
  comments
};