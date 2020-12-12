FROM node:alpine

WORKDIR /usr/app

COPY wp-plugin-erp/package*.json ./

RUN npm install && mv /usr/app/node_modules /node_modules

COPY wp-plugin-erp ./

EXPOSE 3000

CMD [ "npm", "start" ]