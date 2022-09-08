FROM node:16.17-slim

RUN apt-get update && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_HOST
ARG VITE_ORACLE_HOST
ARG VITE_FINTOC_PUBLIC_KEY

RUN npm run build

RUN useradd -m fakeuser
USER fakeuser

CMD ["npm", "run", "production"]
