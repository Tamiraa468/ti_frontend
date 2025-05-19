FROM node:20 AS builder

ARG VITE_API_URL
ARG VITE_FILE_GET_URL
ARG VITE_PASSPHASE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_FILE_GET_URL=$VITE_FILE_GET_URL
ENV VITE_PASSPHASE=$VITE_PASSPHASE

WORKDIR /next/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
# COPY prod_env ./.env
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /next/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
