FROM node:20.5.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV BACKEND_URL=http://localhost:8000/api/comments

EXPOSE 3000

CMD ["npm", "start"]