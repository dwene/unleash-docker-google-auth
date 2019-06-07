FROM node:8-alpine

RUN npm install --production

COPY . .

EXPOSE 8080

CMD node index.js
