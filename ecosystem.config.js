module.exports = {
  apps : [{
    script: "etheroracle.py",
    name: "ethergas-oracle",
    interpreter: "/usr/bin/python3",
    max_memory_restart: "1G"
  }, {
    script: 'index.js',
    name: "ethergas-api",
    max_memory_restart: "1G"
  }]
};
