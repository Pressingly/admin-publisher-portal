FROM node:20-alpine as build
FROM public.ecr.aws/docker/library/node:20-alpine3.18 as build
WORKDIR /app

COPY . .

RUN apk add python3 build-base
RUN yarn && yarn build && npm prune --production

FROM public.ecr.aws/nginx/nginx:stable-alpine3.19-slim
ARG API_URL
ARG APP_ENV
ENV APP_ENV=${APP_ENV}
ENV API_URL=${API_URL}
WORKDIR /usr/share/nginx/html

RUN apk add --no-cache bash
RUN apk update && apk upgrade libx11 nghttp2 openssl tiff

COPY --from=build /app/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
#COPY ./.env.sh ./.env.sh

USER nginx

EXPOSE 80

ENTRYPOINT ["/bin/bash", "-c", "./.env.sh && nginx -g \"daemon off;\""]
