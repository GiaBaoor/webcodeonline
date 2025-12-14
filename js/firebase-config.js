// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzh3r6pSK5kVd8Szs6mJIUpAccAgVNtrI",
  authDomain: "jsi-07-demo.firebaseapp.com",
  projectId: "jsi-07-demo",
  storageBucket: "jsi-07-demo.firebasestorage.app",
  messagingSenderId: "879632274965",
  appId: "1:879632274965:web:3fb1b2b808b92494e9201c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

