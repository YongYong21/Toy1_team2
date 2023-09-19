import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDmv3Upc54v-xqu3GUwp90wBGSCUrKaEHs',
  authDomain: 'toyproject1-c93f3.firebaseapp.com',
  projectId: 'toyproject1-c93f3',
  storageBucket: 'toyproject1-c93f3.appspot.com',
  messagingSenderId: '690596245446',
  appId: '1:690596245446:web:28caf882834890ff4b4cc7',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const firestore = firebase.firestore();
export const db = firebase.firestore();
export const storage = firebase.storage();
