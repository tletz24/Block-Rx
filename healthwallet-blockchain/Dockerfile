FROM node:12.16.3

RUN apt-get update -y && apt-get install -y curl
#RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
#RUN . ~/.nvm/nvm.sh
#RUN nvm install lts/carbon
#RUN nvm use lts/carbon
RUN apt-get install g++ -y
WORKDIR /root
COPY . healthwallet/

##Step 2 - Install dependencies
WORKDIR /root/healthwallet/healthwallet-rest-api
RUN npm install


##Step 3 - Generate a connection profile
WORKDIR /root/healthwallet/healthwallet-rest-api/connection-profile
RUN chmod +x ./gen-connection-profile.sh
RUN ./gen-connection-profile.sh
WORKDIR /root/healthwallet/tmp/connection-profile/
RUN cat healthwallet-connection-profile.yaml


##Step 4 - Run the REST API Node.js application
WORKDIR /root/healthwallet/healthwallet-rest-api
RUN npm rebuild
CMD node app.js
