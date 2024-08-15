import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {

    const [user, setUser] = useState(null)

    // create account
    const createAccount = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }
    
    // update user
    let userUpdate = async(displayName, photoURL) => {
        return updateProfile(auth.currentUser, { displayName, photoURL });
       
    }
    // login user 
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // log out user 
    const userLogOut = () => {
        return signOut(auth)
    }
    
    // set onAuthStateChanged
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,  (currentUser) => {
            console.log("onAuthStateChanged", currentUser)
            setUser(currentUser)
        })
        return () => {
           unSubscribe()
        }
       }, [])

    const userInfo = {
        createAccount,
        userUpdate,
        loginUser,
        user,
        userLogOut 
    }
    return (
        <AuthContext.Provider value={userInfo}>
           { children }
        </AuthContext.Provider>
    );
};

export default Context;