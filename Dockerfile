FROM alpine:latest AS base
RUN apk add --no-cache nodejs curl && apk add --no-cache npm && rm -rf /var/cache/apk/*
COPY ./ ./
COPY package*.json .
RUN npm ci
RUN npm run build
RUN npm cache clean --force
ENTRYPOINT ["npx", "serve", "/dist"]
