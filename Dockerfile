ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci  # installs dev dependencies too

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]