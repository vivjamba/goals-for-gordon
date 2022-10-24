# syntax=docker/dockerfile:1

#node:14-alpine is used for sizing reasons to save on image-registry.
FROM node:14-alpine as base
WORKDIR /app
#COPY ["package.json", "package-lock.json*", "./"]
COPY package*.json ./

FROM base as dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
CMD [ "npm", "run", "dev-up" ]

FROM base as prod
ENV NODE_ENV=production
RUN npm ci --production
COPY . .
CMD [ "node", "server.js" ]

FROM base as test
ENV NODE_ENV=testing
RUN npm ci
COPY . .
CMD [ "npm", "run", "test" ]

