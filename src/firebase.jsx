import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0I8MbMNTwZ9I8xt-j_pSehf6oMpabmL4",
    authDomain: "ai-code-snippet-manager-c0f7a.firebaseapp.com",
    projectId: "ai-code-snippet-manager-c0f7a",
    storageBucket: "ai-code-snippet-manager-c0f7a.firebasestorage.app",
    messagingSenderId: "782366637793",
    appId: "1:782366637793:web:901c8552eee58aa34681a0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);