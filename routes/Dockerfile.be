FROM node:14
RUN git clone https://github.com/nalDaniels/FPTest.git
WORKDIR FPTest/routes
EXPOSE 8000
RUN npm install 
CMD [ "npm", "start"]
