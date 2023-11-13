FROM node:18.14.2 as build

WORKDIR /app

COPY . ./
RUN npm i -g @vercel/ncc pkg && yarn && yarn build && ncc build ./dist/server.js && pkg -t node18-alpine-x64 ./dist/index.js  -o /usr/local/bin/rarimo-poh-action

FROM alpine:3.9

COPY --from=build /usr/local/bin/rarimo-poh-action /usr/local/bin/rarimo-poh-action

ENV PORT=8000
EXPOSE 8000
ENTRYPOINT ["rarimo-poh-action"]
