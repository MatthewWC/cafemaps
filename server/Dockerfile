FROM node:10

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 8080