# ethergas-api
Ethergas oracle api

Requirements:
 - nodejs v10+
 - python3
 - pip3

Installation:
 - sudo apt install python3-pip
 - pip3 install -r required.txt
 - yarn/npm install
 - create a config.json using the config.template.json file
 - set workers to false if you intend to use it as an api route

start:
 - yarn/npm start


 Docker:
  - create a folder named `.ethergas` - `mkdir ~/.ethergas`
  - create `config.json` inside `~/.ethergas` - follow the config.template.json file
  - create `oracleconfig.py` inside `~/.ethergas` - follow the oracaleconfig.py file
  - `docker run -d -v $HOME/.ethergas/config.json:/usr/src/app/config.json -v $HOME/.ethergas/oracleconfig.py:/usr/src/app/oracleconfig.py ethergasio/oracle:1.0.0`