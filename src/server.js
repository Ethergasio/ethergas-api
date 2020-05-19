const config = require('../config.json');
const fs = require('fs-extra');
const isEqual = require('lodash.isequal');
const cfRequest = require('./cfrequest');
const fastify = require('fastify')({ logger: true });
const path = require('path');
const jsonPath = path.join(__dirname, '../json');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}

let start;
if (!config.workers) {
  fastify.register(require('fastify-static'), {
    root: jsonPath
  })

  fastify.get('/ethergas', function(req, reply) {
    reply.sendFile('ethergas.json');
  })

  start = async () => {
    try {
      await fastify.listen(config.port);
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
} else {
  let cacheprice = {};
  let timer = 0;
  start = async () => {
    try {
      const priceObj = await fs.readJson(path.join(jsonPath,'ethergas.json'));
      const toCompare = {low: priceObj.low, standard: priceObj.standard, fast: priceObj.fast};
      if(!isEqual(cacheprice, toCompare)) {
        console.log('change in price, pushing to cf')
        await cfRequest(priceObj);
        cacheprice = toCompare;
        timer = 120000;
      } else {
        console.log('no change in price, not pushing')
        timer = 60000;
      }
      sleep(timer).then(start)
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}
async function init(){
  const exists = await fs.pathExists(path.join(jsonPath,'ethergas.json'));
  if(!exists) {
    console.log('json file not ready, retrying in 10 seconds')
    await sleep(10000);
    return init()
  }else {
    return start()
  }
}

module.exports = init;