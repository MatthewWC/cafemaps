FROM node:10.16.0-alpine

COPY package*.json ./
RUN npm install

COPY *.js ./

EXPOSE 8080
CMD [ "npm", "run", "start" ]