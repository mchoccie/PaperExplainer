// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl-KjId8RIhu1X0vn6Hq160JJfUfL6ss4",
  authDomain: "paperexplainer-f71b1.firebaseapp.com",
  projectId: "paperexplainer-f71b1",
  storageBucket: "paperexplainer-f71b1.appspot.com",
  messagingSenderId: "46415869982",
  appId: "1:46415869982:web:c90cb58e55416ebf04160f",
  measurementId: "G-2TX91ZMWL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const express = require('express');
const multer = require('multer');


// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);