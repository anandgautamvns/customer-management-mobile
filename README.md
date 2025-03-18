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

🌍 Publishing the App to Expo
  Expo allows you to publish the app and share it easily.

1️⃣ Ensure You're Logged In
  expo login

2️⃣ Publish the App\
  expo publish

This will generate a public Expo URL where users can access the latest version of your app.

🔄 Updating Dependencies
To keep dependencies updated:
  yarn update
If new dependencies are added, update package.json and lock file:
  yarn install

🛠 Environment Variables
Use a .env file (ignored via .gitignore) to store sensitive credentials:
  EXPO_USERNAME=your_expo_username
  EXPO_PASSWORD=your_expo_password

To use these in your app, install react-native-dotenv:
  yarn add react-native-dotenv

Then, import it in your app:
import { EXPO_USERNAME } from '@env';
📡 API Configuration
 If your app fetches data from an API, store the base URL in config.js:
 export const API_BASE_URL = 'https://api.example.com';

Use it in components:
import { API_BASE_URL } from '../config';

🧪 Testing
Run tests using:

npm test
To use Jest with React Native, install:
yarn add  jest @testing-library/react-native --save-dev
