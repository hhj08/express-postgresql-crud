const express = require('express');
require('dotenv').config();
const generateConfig = require('./config/generateConfig');
const models = require('./models');

const app = express();

app.listen(process.env.SERVER_PORT, () => {
   generateConfig();
   console.log('server start');

   models.sequelize.sync({force: false})
       .then(() => {
          console.log(`db connected`);
       })
       .catch((e) => {
          console.error(`db connected error : ${e}`);
          process.exit();
       });
});