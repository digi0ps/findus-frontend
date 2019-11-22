FROM node:8

WORKDIR /code
COPY package.json /code
RUN npm install
COPY . /code
EXPOSE 3000