FROM node:8.7.0-alpine

RUN mkdir /code
WORKDIR /code

COPY package.json /code
COPY yarn.lock /code

RUN yarn install

COPY . /code
EXPOSE 3000