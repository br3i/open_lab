### Stage 1: build the angular app
FROM node:18-alpine AS builder
WORKDIR /app

# cache and install deps
COPY package*.json ./
RUN npm ci --silent

# copy source and build
COPY . .
RUN npm run build -- --configuration production

### Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/banco-alimentos /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
