const needle = require('needle');
const config = require('../config.json')
module.exports = async function(priceobj) {
  try {
    const resp = await needle('put', `https://api.cloudflare.com/client/v4/accounts/${config.cfAccountId}/storage/kv/namespaces/${config.cfWorkerKvId}/values/gas-price`,
      JSON.stringify(priceobj),
      {
        headers: {
          'X-Auth-Email': config.cfAuthEmail,
          'X-Auth-Key': config.cfAuthKey,
          'Content-Type': 'text/plain'
        }
      })
    return resp;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}