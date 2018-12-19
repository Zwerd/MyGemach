this app build to make help each other in the community, the first vertiin is only managing an open and active gemach which you can to open the fundetion and adding to it an items for each fundetion and display data like who is the lest person that used the item, time about the day this person must bring back the item to the gemach...
please reffer to the documents for more details


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


