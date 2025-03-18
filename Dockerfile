# Use an official Node image based on Alpine Linux for a lightweight container
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Install expo-cli globally
RUN yarn global add expo-cli

# Copy the rest of your application files into the container
COPY . .

# Copy the entrypoint script and ensure it’s executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint to run our custom script
ENTRYPOINT ["/app/entrypoint.sh"]

# Expose Expo's default port (adjust if needed)
EXPOSE 8080

# Start the Expo project (using tunnel mode to bypass local network issues)
CMD ["yarn", "start", "--tunnel"]
