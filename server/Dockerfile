# syntax=docker/dockerfile:1

#node:14-alpine is used for sizing reasons to save on image-registry.
FROM node:14-alpine as base

ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

#FROM base as test
#RUN npm ci
#COPY . .
#RUN [ "npm", "run", "test" ]

FROM base as prod
RUN npm ci --production
COPY . .
CMD [ "node", "server.js" ]

