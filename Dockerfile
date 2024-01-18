FROM node:16-alpine

ENV NODE_ENV=production

RUN mkdir -p /server
WORKDIR /server
COPY package.json /server
RUN npm install --production
COPY . ./
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN npm run build
EXPOSE 3000
CMD npm start
