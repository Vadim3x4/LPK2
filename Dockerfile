FROM node:21.3
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
