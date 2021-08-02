import { types } from "../types/types";
import {db, googleAuthProvider, firebase} from '../firebase/firebaseConfig';
import { finishLoadingAction, startLoadingAction } from "./ui";
import Swal from 'sweetalert2';

export const startLoginEmailPass = (email, password) => {
    return (dispatch) => {
        
        dispatch(startLoadingAction());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await dispatch( loginAction(user.uid, user.displayName) );
            dispatch(finishLoadingAction());
        }).catch(error => {

            console.log(error);
            dispatch(finishLoadingAction());
            Swal.fire('Error', error.message, 'error')

        })
        
    }
}

export const startRegisterWithEmailPassName = (email, password, name) => {

    return (dispatch)=>{

        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async({user}) => {

            await user.updateProfile({ displayName:name });

            dispatch(loginAction(user.uid, user.displayName));

        } ).catch(error => Swal.fire('Error', error.message, 'error'))
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({user}) =>{

            dispatch(loginAction(user.uid, user.displayName))

        } )
    }
}

export const loginAction = (uid, displayName) =>{
    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }

    }
}


export const startLogoutAction = () =>{
    return async(dispatch) => {
        await firebase.auth().signOut()
        .then(console.log("LoggedOut Succesfully!"))
        .catch(error => {
            Swal.fire('Error', error.message, 'error')
        });

        dispatch(logoutAction());
    }

}

export const logoutAction = () =>{
    return {
        type: types.logout
    }

}