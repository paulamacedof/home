FROM node:20.16.0-alpine

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]