# Face Detection

A proof of concept React Native application that demonstrates hands-free navigation using facial gestures. Users can navigate through lists and select items using head movements detected by the front camera.

The music playlist is just an example implementation. This gesture-based navigation system can be applied to any scrollable list or interface requiring accessible, touch-free interaction.

## Technologies

Built with Expo, React Native Vision Camera, React Native Reanimated, and react-native-vision-camera-face-detector for real-time face detection.

## Setup and Running

Install dependencies:
```bash
npm install
```

Generate native projects:
```bash
npx expo prebuild
```

Run on iOS:
```bash
npx expo run:ios
```

Run on Android:
```bash
npx expo run:android
```

Camera permissions will be requested on first launch.