const fs = require('fs');
const process = require('process');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

function generateConfig () {
    const originalConfig = require(__dirname + '/../config/config.json');

    const configJson = {
        "development": {
            "username": process.env.DEVDB_USERNAME,
            "password": process.env.DEVDB_PASSWORD,
            "database": process.env.DEVDB_NAME,
            "host": process.env.DEVDB_HOST,
            "dialect": process.env.DEVDB_DIALECT
        },
        "test": {
            "username": "root",
            "password": null,
            "database": "database_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": null,
            "database": "database_production",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }

    if (JSON.stringify(originalConfig[env]) !== JSON.stringify(configJson[env])) {
        fs.writeFileSync('./config/config.json', JSON.stringify(configJson, null, 2), 'utf-8');
    }

}

module.exports = generateConfig