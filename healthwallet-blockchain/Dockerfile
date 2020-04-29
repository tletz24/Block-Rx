FROM amazonlinux

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
RUN . ~/.nvm/nvm.sh
RUN nvm install lts/carbon
RUN nvm use lts/carbon
RUN sudo yum install gcc-c++ -y

##Step 2 - Install dependencies
RUN cd ~/healthwallet/healthwallet-rest-api
RUN npm install


##Step 3 - Generate a connection profile
RUN cd ~/healthwallet/healthwallet-rest-api/connection-profile
RUN chmod +x ./gen-connection-profile.sh
RUN ./gen-connection-profile.sh
RUN cd ~/healthwallet/tmp/connection-profile/
RUN cat healthwallet-connection-profile.yaml


##Step 4 - Run the REST API Node.js application
RUN cd ~/healthwallet/healthwallet-rest-api
RUN nvm use lts/carbon
RUN node app.js