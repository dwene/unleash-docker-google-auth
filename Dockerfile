FROM node:12-alpine

RUN apk update
RUN apk --no-cache add --virtual ca-certificates
COPY ca-certificate.crt /usr/local/share/ca-certificates/ca-certificate.crt
RUN update-ca-certificates

RUN npm install --production

COPY . .

EXPOSE 8080

CMD node index.js
