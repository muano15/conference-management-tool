FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4040

CMD ["npm", "start"]