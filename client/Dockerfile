# build stage
FROM node:14-alpine as dev
WORKDIR /app
#COPY package*.json ./
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

#RUN npm run build

# production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

