FROM ethergasio/base:1.0.4

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install pm2 -g && yarn install --prod

COPY required.txt ./

RUN pip3 install -r required.txt

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]