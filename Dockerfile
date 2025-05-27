FROM node:alpine3.18 AS build

#Declare build arguments

ARG REACT_APP_BASE_URL
ARG REACT_APP_SERVER_BASE_URL

# Set environment variables for the build
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
ENV REACT_APP_SERVER_BASE_URL=${REACT_APP_SERVER_BASE_URL}

#build app
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
# If REACT_APP_BASE-URL is used during the build, declare it as an ARG
RUN npm run build

#serve with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
