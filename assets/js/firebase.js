 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmpFz0tFFAgUZpNYee5tkE-UbmtU78kGQ",
  authDomain: "bite-152e5.firebaseapp.com",
  databaseURL: "https://bite-152e5-default-rtdb.firebaseio.com/",
  projectId: "bite-152e5",
  storageBucket: "bite-152e5.firebasestorage.app",
  messagingSenderId: "650796811681",
  appId: "1:650796811681:web:c0ac9fe66bedae1e43b7e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
window.firebase = firebase;

const reservationsRef = ref(database, 'reservations');
window.reservationsRef = reservationsRef;

// Function to convert UTC time to local SAST time
function convertUTCToLocal(utcDateString) {
  const utcDate = new Date(utcDateString);
  return utcDate.toLocaleString("en-GB", { timeZone: "Africa/Johannesburg" });
}
