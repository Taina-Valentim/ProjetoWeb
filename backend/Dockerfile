# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production


WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .
USER root
RUN npm install
RUN npm rebuild sqlite3
USER node


EXPOSE 8081
CMD npm run start