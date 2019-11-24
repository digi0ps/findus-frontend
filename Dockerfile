# ------------------------
# FRONTEND
# ------------------------

FROM node:8.16.2-alpine3.10 as node_base

FROM node_base as deps
WORKDIR /code
COPY package.json /code
COPY yarn.lock /code
RUN yarn install

FROM node_base as build
WORKDIR /code
COPY --from=deps /code/node_modules /code/node_modules
COPY . /code
RUN yarn build

FROM socialengine/nginx-spa
COPY --from=build /code/build /app

EXPOSE 80