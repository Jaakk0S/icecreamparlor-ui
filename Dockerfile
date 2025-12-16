FROM alpine:latest AS base

RUN apk add --no-cache nodejs curl && apk add --no-cache npm && rm -rf /var/cache/apk/*
COPY ./ ./

RUN npm ci
RUN npm run build
RUN npm cache clean --force
RUN mv assets/* dist/assets/

ENTRYPOINT ["npx", "serve", "/dist"]
