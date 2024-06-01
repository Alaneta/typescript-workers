FROM node:18 as builder
WORKDIR /tmp/app
COPY . .
RUN yarn install --production --frozen-lockfile

FROM node:18-alpine

ENV ENVIRONMENT=""
ENV NEW_RELIC_APP_NAME=""
ENV NEW_RELIC_LICENSE_KEY=""
ENV NEW_RELIC_NO_CONFIG_FILE="true"

EXPOSE $SERVER_PORT

RUN npm i -g @adonisjs/cli

COPY --from=builder --chown=node:node /tmp/app /app

WORKDIR /app
USER node

CMD ["yarn", "start"]
