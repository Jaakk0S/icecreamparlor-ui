FROM alpine:latest AS base

ENV VITE_MENU_API_HOST=menu-service
ENV VITE_MENU_API_PORT=8080
ENV VITE_ORDER_API_HOST=order-service
ENV VITE_ORDER_API_PORT=8080

RUN apk add --no-cache nodejs curl && apk add --no-cache npm && rm -rf /var/cache/apk/*
COPY ./ ./
COPY package*.json .

RUN npm ci
RUN npm run build
RUN npm cache clean --force

ENTRYPOINT ["npx", "serve", "/dist"]
