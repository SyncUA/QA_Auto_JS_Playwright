FROM mcr.microsoft.com/playwright:v1.56.1-noble
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]
