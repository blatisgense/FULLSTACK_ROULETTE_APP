FROM node:lts-alpine
WORKDIR /app
RUN npm i -g @nestjs/cli@10.0.0
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./