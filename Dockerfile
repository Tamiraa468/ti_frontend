FROM node:alpine3.18 AS build

ARG REACT_APP_BASE_URL
ARG REACT_APP_SERVER_BASE_URL

ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
ENV REACT_APP_SERVER_BASE_URL=${REACT_APP_SERVER_BASE_URL}

WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
