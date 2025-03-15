# Use a lightweight Node image as the base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of your project files
COPY . .

# Install expo-cli globally
RUN yarn install -g expo-cli

# Expose Expo's default port (adjust if needed)
EXPOSE 8081

# Start the Expo project (using tunnel mode to bypass local network issues)
CMD ["yarn", "start", "--tunnel"]