**Customer Management Mobile(React, React-Native, Redux, saga, expo)**
**Project Structure**

Customer-management-mobile/
├── assets
├── src/
│   ├── dataservice/
│   ├── screens/
│   |   ├── Login/
│   |   ├── Registration/
│   |   ├── Profile/
│   |   ├── Customer/
│   ├── redux/
│   ├── navigation/
|   |   ├── AppNavigator.tsx
│   └── main.tsx
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── entrypoint.sh

**Prerequisites**
  *Ensure you have the following installed:*

  Node.js (20+ recommended)
  Expo CLI (npm install -g expo-cli)
  Docker (if using Docker)
  Android Studio (for Android Emulator)
  Xcode (for iOS Simulator on macOS)
  

**Installation & Setup**
  *Clone the Repository*

  git clone https://github.com/anandgautamvns/customer-management-mobile.git
  cd my-expo-app

*Install Dependencies*
  yarn install
*Start the Expo Development Server*
  npx expo start
  yarn start

This will provide a QR code. You can scan it using:

Expo Go app (on iOS/Android)
Android Emulator or iOS Simulator (via a or i key)

*How to Build and Publish*
Build the Docker Image:

If you’re using Docker Compose:
  docker-compose build
Or build manually:
  docker build -t my-expo-app .

Run the Container:
Using Docker Compose:
  docker-compose run expo
Or run the Docker image directly (if using build-time credentials or if you’re providing credentials via environment variables):

  docker run --rm -e EXPO_USERNAME=your_expo_username -e EXPO_PASSWORD=your_expo_password my-expo-app
