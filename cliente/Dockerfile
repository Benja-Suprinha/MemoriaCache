FROM node:17.8.0-alpine3.15

WORKDIR /home/node

COPY . .
RUN npm install -g nodemon
RUN npm install express
RUN npm install redis

CMD [ "npm", "start" ]