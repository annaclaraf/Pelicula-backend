FROM node
RUN node --version
RUN npm --version
RUN mkdir /services
WORKDIR /services
COPY services /services
EXPOSE 5000