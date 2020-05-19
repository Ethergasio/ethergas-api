const fs = require('fs-extra');
const path = require('path');
module.exports = function(){
    if(!fs.pathExistsSync(path.join(__dirname, '../config.json'))) {
        console.log('missing config file');
        process.exit(1)
    }
    if(!fs.pathExistsSync(path.join(__dirname, '../oracleconfig.py'))) {
        console.log('missing oracleconfig file');
        process.exit(1)
    }
}