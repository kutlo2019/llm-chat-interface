import { auth } from '@/config/firebase.config'

const logOut = () => {
  auth.signOut().then(() => {
    alert('You have signed out')
  })
}

export { logOut }
