FROM node:lts-alpine
ARG SOME_ARG
ENV NODE_EVN=$SOME_ARG
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5001
RUN chown -R node /usr/src/app
RUN node /usr/src/app/database/queries.js timeout 2
USER node
CMD ["node", "main.js"]
