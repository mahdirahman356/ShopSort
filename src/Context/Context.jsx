import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {

    const createAccount = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }

    let userUpdate = async(displayName, photoURL) => {
        return updateProfile(auth.currentUser, { displayName, photoURL });
       
    }

    const userInfo = {
        createAccount,
        userUpdate
    }
    return (
        <AuthContext.Provider value={userInfo}>
           { children }
        </AuthContext.Provider>
    );
};

export default Context;