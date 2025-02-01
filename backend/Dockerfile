# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy all files to the container
COPY . .

# Start the backend
CMD ["npm", "run", "start"]
EXPOSE 5000
