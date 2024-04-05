import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAjhiMKfbe65f-O0eLC7P82UviMhyrty3A',
  authDomain: 'llm-chat-interface.firebaseapp.com',
  projectId: 'llm-chat-interface',
  storageBucket: 'llm-chat-interface.appspot.com',
  messagingSenderId: '474412782571',
  appId: '1:474412782571:web:5242885a763d31f1213fae'
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app)

export { app, firestore, auth }
