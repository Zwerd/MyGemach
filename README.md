run the foolowing commands for modules:
run npm for adding navigation:
npm install --save react-navigation

run npm for modalbox support:
npm install react-native-modalbox@latest --save

run yarn for adding option to pick some photo using camera or pick from library
yarn add react-native-image-picker or sudo yarn add react-native-image-picker

link the image picker with our project:
react-native link react-native-image-picker

adding permission in the AndroidManifest.xml file:
'''
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
'''


