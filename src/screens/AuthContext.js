import React, { createContext, useReducer } from 'react';
import authReducer from './authReducer'; 
// ... (other imports)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState); // Initialize useReducer

  // Add sign-in, sign-up, and sign-out functions using dispatch
  const signIn = (userData) => {
    dispatch({ type: 'SIGN_IN', payload: userData });
  };

  const signUp = (userData) => {
    dispatch({ type: 'SIGN_UP', payload: userData });
  };

  const signOut = () => {
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useReducer } from 'react'; // Make sure to import useReducer
// import authReducer from './authReducer'; // Import your authReducer
// // ... (other imports)

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState); // Initialize useReducer

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useReducer, useEffect } from 'react';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { auth, firestore, storage } from './../../firebase';

// import authReducer from './authReducer';

// const initialState = {
//   user: null,
//   username: '',
//   error: null,
//   loading: false,
// };

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   const setUser = (user) => {
//     dispatch({ type: 'SET_USER', payload: user });
//   };

//   const signIn = async (email, password) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       dispatch({ type: 'SIGN_IN', payload: user });
//     } catch (error) {
//       console.log('Sign in error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign in failed. Please check your credentials and try again.' });
//     }
//   };

//   const signUp = async (name, email, phone, password, profilePicture) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update user profile with additional fields
//       await updateProfile(user, { displayName: name, phoneNumber: phone, userId: user.uid });

//       // Save user details to Firestore
//       await saveUserDetail(user.uid, { name, email, phone, userId: user.uid });

//       // Upload profile picture to Cloud Storage
//       const profilePictureUrl = await uploadProfilePicture(user.uid, profilePicture);

//       // Update user profile with profile picture URL
//       await updateProfile(user, { photoURL: profilePictureUrl });

//       dispatch({ type: 'SIGN_UP', payload: user });
//     } catch (error) {
//       console.log('Sign up error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign up failed. Please try again.' });
//     }
//   };

//   const handleSignOut = async () => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       await signOut(auth);
//       dispatch({ type: 'SIGN_OUT' });
//     } catch (error) {
//       console.log('Sign out error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign out failed. Please try again.' });
//     }
//   };

//   const saveUserDetail = async (userId, userDetails) => {
//     const userDocRef = doc(firestore, 'users', userId);
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       await setDoc(userDocRef, userDetails, { merge: true });
//       console.log('User details saved successfully.');
//     } catch (error) {
//       console.log('Error saving user details:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Failed to save user details. Please try again.' });
//     }
//   };

//   const uploadProfilePicture = async (userId, file) => {
//     const profilePictureRef = ref(storage, `profilePictures/${userId}`);
//     try {
//       await uploadBytes(profilePictureRef, file);
//       const profilePictureUrl = await getDownloadURL(profilePictureRef);
//       return profilePictureUrl;
//     } catch (error) {
//       console.log('Error uploading profile picture:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Failed to upload profile picture. Please try again.' });
//       return null;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         state,
//         setUser,
//         signIn,
//         signUp,
//         signOut: handleSignOut,
//         saveUserDetail,
//         uploadProfilePicture,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useReducer, useEffect } from 'react';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import * as SecureStore from 'expo-secure-store';
// import { auth, firestore, storage } from './../../firebase';

// import authReducer from './authReducer';

// const initialState = {
//   user: null,
//   username: '',
//   error: null,
//   loading: false,
// };

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     // Load user state from SecureStore on component mount
//     loadUserState();
//   }, []);

//   const setUser = (user) => {
//     dispatch({ type: 'SET_USER', payload: user });
//     saveValueToSecureStore('user', user);
//   };

//   const signIn = async (email, password) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       dispatch({ type: 'SIGN_IN', payload: user });
//       saveValueToSecureStore('user', user);
//     } catch (error) {
//       console.log('Sign in error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign in failed. Please check your credentials and try again.' });
//     }
//   };

//   const signUp = async (name, email, phone, password, profilePicture) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update user profile with additional fields
//       await updateProfile(user, { displayName: name, phoneNumber: phone, userId: user.uid });

//       // Save user details to Firestore
//       await saveUserDetail(user.uid, { name, email, phone, userId: user.uid });

//       // Upload profile picture to Cloud Storage
//       const profilePictureUrl = await uploadProfilePicture(user.uid, profilePicture);

//       // Update user profile with profile picture URL
//       await updateProfile(user, { photoURL: profilePictureUrl });

//       dispatch({ type: 'SIGN_UP', payload: user });
//       saveValueToSecureStore('user', user);
//     } catch (error) {
//       console.log('Sign up error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign up failed. Please try again.' });
//     }
//   };

//   const handleSignOut = async () => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       await signOut(auth);
//       dispatch({ type: 'SIGN_OUT' });
//       deleteValueFromSecureStore('user');
//     } catch (error) {
//       console.log('Sign out error:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Sign out failed. Please try again.' });
//     }
//   };

//   const saveUserDetail = async (userId, userDetails) => {
//     const userDocRef = doc(firestore, 'users', userId);
//     dispatch({ type: 'CLEAR_ERROR' });
//     try {
//       await setDoc(userDocRef, userDetails, { merge: true });
//       console.log('User details saved successfully.');
//     } catch (error) {
//       console.log('Error saving user details:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Failed to save user details. Please try again.' });
//     }
//   };

//   const uploadProfilePicture = async (userId, file) => {
//     const profilePictureRef = ref(storage, `profilePictures/${userId}`);
//     try {
//       await uploadBytes(profilePictureRef, file);
//       const profilePictureUrl = await getDownloadURL(profilePictureRef);
//       return profilePictureUrl;
//     } catch (error) {
//       console.log('Error uploading profile picture:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Failed to upload profile picture. Please try again.' });
//       return null;
//     }
//   };

//   const saveValueToSecureStore = async (key, value) => {
//     try {
//       const valueString = JSON.stringify(value);
//       await SecureStore.setItemAsync(key, valueString);
//     } catch (error) {
//       console.log(`Error saving ${key} to SecureStore:`, error);
//     }
//   };

//   const deleteValueFromSecureStore = async (key) => {
//     try {
//       await SecureStore.deleteItemAsync(key);
//     } catch (error) {
//       console.log(`Error deleting ${key} from SecureStore:`, error);
//     }
//   };

//   const loadUserState = async () => {
//     try {
//       const userString = await SecureStore.getItemAsync('user');
//       console.log('Retrieved userString:', userString);
//       if (userString) {
//         const user = JSON.parse(userString);
//         console.log('Parsed user:', user);
//         dispatch({ type: 'SET_USER', payload: user });
//       }
//       dispatch({ type: 'SET_LOADING', payload: false });
//     } catch (error) {
//       console.log('Error loading user state:', error);
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         state,
//         setUser,
//         signIn,
//         signUp,
//         signOut: handleSignOut,
//         saveUserDetail,
//         uploadProfilePicture,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

