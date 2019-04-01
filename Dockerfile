FROM node

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm install -g --unsafe-perm node-sass
RUN npm run build

ENV HOST 0.0.0.0