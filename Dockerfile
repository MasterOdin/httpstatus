FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN addgroup -S appgroup \
    && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

RUN npm install \
    && npm run build \
    && rm -rf node_modules \
    && npm install --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
