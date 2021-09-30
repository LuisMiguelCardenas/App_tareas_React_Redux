import Swal from 'sweetalert2'
import {
  getAuth,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { finishLoading, startLoading } from "./ui";


export const startLoginEmailPassword = (email, password) => {
  const Swal = require('sweetalert2')
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        //console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'El usuario o contraseña son incorrectos',
        })
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });

        //console.log(user);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: 'El usuario ya está registrado',
        })
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async(dispatch) => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
      dispatch( logout());
  };
};


export const logout = () => ({
  type: types.logout
})
