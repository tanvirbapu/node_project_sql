FROM node:14

WORKDIR  /usr/src

COPY package.json ./ 

RUN npm install

CMD ["npm", "start"]