FROM node:18.14.2 as build

WORKDIR /app

COPY . ./
RUN npm i -g @vercel/ncc pkg && yarn && yarn build && ncc build ./dist/bin/www.js && pkg -t node18-alpine-x64 ./dist/index.js  -o /usr/local/bin/www

FROM alpine:3.9

COPY --from=build /usr/local/bin/www /usr/local/bin/www

EXPOSE 3000
ENTRYPOINT ["www"]
