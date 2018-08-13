FROM node

WORKDIR app
ENV NODE_ENV=production

COPY . .
RUN npm install --production

EXPOSE 5000

CMD ["node", "server.js"]