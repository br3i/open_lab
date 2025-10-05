FROM node:18-alpine

WORKDIR /usr/src/app

# copy package manifests first to leverage Docker cache
COPY package*.json ./

# install production dependencies
RUN npm ci --only=production

# copy source
COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "app.js"]
