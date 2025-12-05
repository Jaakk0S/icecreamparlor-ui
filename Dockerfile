FROM alpine:latest AS base
RUN apk add --no-cache nodejs && apk add --no-cache npm && rm -rf /var/cache/apk/*
COPY dist/ dist/
COPY package*.json .
RUN npm ci --omit=dev
RUN npm cache clean --force
COPY dist/ dist/
ENTRYPOINT ["npx","serve", "/dist"]
