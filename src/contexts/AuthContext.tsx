import { createContext, ReactNode, } from 'react'
import { useState, useEffect } from 'react'
import { auth, firebase } from '../service/firebase'

export const UserContext = createContext({} as UserContextType)

type UserContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
  signOutGoogle: () => void;
}

type User ={
  id: string,
  avatar: string,
  name: string,
}

type AuthContextProvider = {
    children: ReactNode
}

export function AuthContextProvide(props: AuthContextProvider) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const {displayName, photoURL, uid} = user
          if (!displayName || !photoURL) {
            throw new Error('Faltando informações do Google')
          }
          setUser({
            id: uid,
            name : displayName,
            avatar: photoURL
          })
        }
      })
      return () => {
          unsubscribe()
      }
    }, [])

    function signOutGoogle() {
      auth.signOut()
    }
  
    async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await auth.signInWithPopup(provider)
        if (result.user) {
          const {displayName, photoURL, uid} = result.user
          if (!displayName || !photoURL) {
            throw new Error('Faltando informações do Google')
          }
          setUser({
            id: uid,
            name : displayName,
            avatar: photoURL
          })
        }
    }
return (
    <UserContext.Provider value={{user, signInWithGoogle, signOutGoogle}} >
        {props.children}
    </UserContext.Provider>
)
}