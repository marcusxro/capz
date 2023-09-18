import { initializeApp } from "firebase/app" //dependencies
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBZuLme-nkfsMlg40W5wgHYDIC1dV967e0",
  authDomain: "auth-78c2e.firebaseapp.com",
  projectId: "auth-78c2e",
  storageBucket: "auth-78c2e.appspot.com",
  messagingSenderId: "869118739436",
  appId: "1:869118739436:web:23c13a4a4f884095e136c9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
