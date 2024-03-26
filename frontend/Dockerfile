FROM node:lts-alpine
WORKDIR /app
RUN npm i -g vite@5.1.5
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./