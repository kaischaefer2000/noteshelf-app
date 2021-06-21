import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAZHHaSYNhpm6e0RJ66N8dvJckXBxfSvcM",
    authDomain: "noteshelf-app-new.firebaseapp.com",
    projectId: "noteshelf-app-new",
    storageBucket: "noteshelf-app-new.appspot.com",
    messagingSenderId: "299520557285",
    appId: "1:299520557285:web:f0d06f76acacbc120fd40c"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

export default firebase