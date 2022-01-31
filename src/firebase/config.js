import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA2NlnLXKYGazJl-XcQRlL0QIPfMNog2Hc",
    authDomain: "my-little-cookbook.firebaseapp.com",
    projectId: "my-little-cookbook",
    storageBucket: "my-little-cookbook.appspot.com",
    messagingSenderId: "75532502524",
    appId: "1:75532502524:web:5633ae6d7bbd5addfade79"
  };

  // init firebase
firebase.initializeApp(firebaseConfig)

  // init services
const projectFirestore = firebase.firestore()

export { projectFirestore }