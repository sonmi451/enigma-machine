# Base image
FROM node:16
RUN  npm i -g npm@latest

# set working directory
RUN mkdir /usr/src/enigma-machine
WORKDIR /usr/src/enigma-machine

# add `/usr/src/enigma-machine/node_modules/.bin` to $PATH
ENV PATH /usr/src/enigma-machine/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/enigma-machine/package.json
RUN npm install

# start app
ENTRYPOINT bash
