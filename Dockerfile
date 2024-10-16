FROM node:22-alpine3.19
WORKDIR /

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE $PORT
CMD [ "npm", "run", "dev" ]