import { firestore } from '@/config/firebase.config'
import { collection, getDoc, getDocs, doc, setDoc, addDoc, query, where } from 'firebase/firestore'
import { auth } from '@/config/firebase.config'

const fetchConversation = async (conversationID: string) => {
  const q = doc(collection(firestore, 'conversations'), conversationID)
  const messageSnapshot = await getDoc(q)
  console.log('snap', messageSnapshot.exists())
  if (messageSnapshot.exists()) {
    return messageSnapshot.data()
  } else {
    return null
  }
}

const fetchConversations = async (uid: string) => {
  const conversations: any = []
  const q = query(collection(firestore, 'conversations'), where('uid', '==', auth.currentUser?.uid))
  const querySnap = await getDocs(q)

  querySnap.forEach((doc) => {
    conversations.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return conversations
}

const updateConversation = async (conversation: any) => {
  const conversationDoc = doc(collection(firestore, 'conversations'), conversation.id)
  const updateConversation = await setDoc(conversationDoc, conversation, { merge: true })
  return updateConversation
}

const createConversation = async (conversation: any) => {
  const colRef = collection(firestore, 'conversations')
  const docRef = await addDoc(colRef, conversation)
  return docRef.id
}

export { fetchConversation, fetchConversations, updateConversation, createConversation }
