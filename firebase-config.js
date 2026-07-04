import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGpDWFnwGQNv9VnNCKPWdYwnSkCAJoIN0",
    authDomain: "gearupadmin-126ae.firebaseapp.com",
    projectId: "gearupadmin-126ae",
    storageBucket: "gearupadmin-126ae.firebasestorage.app",
    messagingSenderId: "390904965529",
    appId: "1:390904965529:web:2b1bec2e53b128f24d4b08"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
};