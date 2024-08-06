# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application using nodemon
CMD ["nodemon", "index.js"]


#docker build -t server .
#run container
#docker run -p 3000:3000 server

#build and run with docker compose
#docker-compose up --build
