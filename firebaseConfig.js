import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC0mp9iROvIX2iubeCJ602NbQMlYmLJAUM",
    authDomain: "daily-planner-d87c9.firebaseapp.com",
    projectId: "daily-planner-d87c9",
    storageBucket: "daily-planner-d87c9.firebasestorage.app",
    messagingSenderId: "658545372596",
    appId: "1:658545372596:web:add5efc20512cfe830d6e1",
    measurementId: "G-XFLQFJMCX0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(firebaseConfig)
export { auth };