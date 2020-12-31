FROM mhart/alpine-node:10 AS builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM mhart/alpine-node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn global add serve

WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]