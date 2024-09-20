import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-project-591c0.firebaseapp.com",
  projectId: "my-project-591c0",
  storageBucket: "my-project-591c0.appspot.com",
  messagingSenderId: "379817649779",
  appId: "1:379817649779:web:96b26e38684048417e2c06",
  measurementId: "G-FVHEHNY0KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage };
