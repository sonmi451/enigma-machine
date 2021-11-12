# Base image
FROM node:16

# Upgrade npm
RUN  npm i -g npm@latest

# Install packages ensuring compatibility
COPY package.json /enigma_machine/
WORKDIR /enigma_machine/node_modules
RUN npm install

# Add installed modules to path
ENV PATH /enigma_machine/node_modules/.bin:$PATH

# Add files needed for app
COPY ./src /enigma_machine/src
COPY ./assets /enigma_machine/assets
COPY ./app.json /enigma_machine/app.json
COPY ./App.js /enigma_machine/./App.js

# Set working directory
WORKDIR /enigma_machine/

ENTRYPOINT bash
