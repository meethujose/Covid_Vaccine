import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebase.initializeApp({
    apiKey: "AIzaSyCfvQlqjVHa60dyaZrMWYhOduXx5724IvQ",
    authDomain: "vaccine-9e17d.firebaseapp.com",
    databaseURL: "https://vaccine-9e17d-default-rtdb.firebaseio.com",
    projectId: "vaccine-9e17d",
    storageBucket: "vaccine-9e17d.appspot.com",
    messagingSenderId: "901286488602",
    appId: "1:901286488602:web:5933e4a8b741f4f4f17fa3",
    measurementId: "G-0GFB5WNC04"
  });
  const db = firebase.firestore();
  const storage = firebase.storage()
  const auth = firebase.auth();
  export  {
    storage,auth,db as default
  }
 