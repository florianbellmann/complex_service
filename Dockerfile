FROM node:14.15.0

COPY package.json .
COPY package-lock.json .
COPY src src/
COPY tsconfig.json .

RUN npm i -g typescript
RUN npm install
RUN tsc

CMD ["node","dist/index.js"]
