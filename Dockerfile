#  Dockerfile for Node Vite Server

FROM node:22-alpine3.19 

WORKDIR /app 

COPY package.json ./

RUN npm install -f 

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm","run","host"]
