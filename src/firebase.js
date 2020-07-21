import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAJinadt0izQFc9WjRvDj0PgZgE0um49sw',
  authDomain: 'react-slack-clone-cc12b.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-cc12b.firebaseio.com',
  projectId: 'react-slack-clone-cc12b',
  storageBucket: 'react-slack-clone-cc12b.appspot.com',
  messagingSenderId: '52050125595',
  appId: '1:52050125595:web:1300e7c5115aab5b14e9be',
  measurementId: 'G-D7CDDQ5999',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
