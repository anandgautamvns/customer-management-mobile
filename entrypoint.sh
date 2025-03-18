#!/bin/sh

# If Expo credentials are provided, log in
if [ -n "$EXPO_USERNAME" ] && [ -n "$EXPO_PASSWORD" ]; then
  echo "Logging in to Expo..."
  expo login --non-interactive --username "$EXPO_USERNAME" --password "$EXPO_PASSWORD"
fi

echo "Publishing Expo application..."
expo publish
