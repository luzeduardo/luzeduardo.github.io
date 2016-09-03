FROM mhart/alpine-node:latest
RUN mkdir /app && cd app && npm install node-static
WORKDIR /var/www
EXPOSE 3000
CMD node /app/index.js