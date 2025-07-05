import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase設定（実際のプロジェクトの値に置き換えてください）
const firebaseConfig = {
  apiKey: "AIzaSyCjdMuheis0dHjV50LY6CpOGCnOIe_-ikM",
  authDomain: "solveme-31cb7.firebaseapp.com",
  projectId: "solveme-31cb7",
  storageBucket: "solveme-31cb7.firebasestorage.app",
  messagingSenderId: "333065677432",
  appId: "1:333065677432:web:0671744771149adfc65b8d",
  measurementId: "G-0HDEFSLNNV"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// 認証を初期化
const auth = getAuth(app);

// Firestoreを初期化
const db = getFirestore(app);

export { auth, db };
