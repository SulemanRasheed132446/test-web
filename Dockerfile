FROM node:12.20.0-alpine3.10 as appbuilder

ARG TAG
ARG ENVMODE
RUN npm install -g create-react-app@4.0.1
WORKDIR /app
COPY . /app

RUN echo $TAG

RUN echo $ENVMODE

RUN npm install

RUN npm run build:$ENVMODE

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=appbuilder /app/build /usr/share/nginx/html
