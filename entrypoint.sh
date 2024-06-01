#!/bin/sh
export APP_NAME=$( jq -r .name package.json | sed 's/\//\\\//g')"-$NODE_ENV"
sed -i -e "s/app_name:[[:space:]].*/app_name: [ '"$APP_NAME"' ], /" newrelic.js
sed -i -e "s/license_key:[[:space:]].*/license_key: '"$NEW_RELIC_LICENSE"' , /" newrelic.js
echo "Executing $APP_NAME"
exec dumb-init node dist/src/app.js