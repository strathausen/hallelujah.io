FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./server/package.json /usr/src/app/
RUN npm install --production && npm cache clean --force
COPY ./server/dist /usr/src/app
COPY ./server/content /usr/src/app/content
COPY ./web/dist /usr/src/app/public
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
CMD [ "node", "server.js" ]
