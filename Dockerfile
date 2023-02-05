FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY dist ./dist
CMD ["npm","run","start"]
EXPOSE "3333"
