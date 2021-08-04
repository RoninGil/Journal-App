import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import {firebase} from '../firebase/firebaseConfig';
import { JournalPage } from '../components/journal/JournalPage'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { //AUTENTICACION: SIEMPRE VA A CHECAR LA AUTENTICACION DESDE FIREBASE
        firebase.auth().onAuthStateChanged( async(user) => {
            if(user?.uid){

                dispatch(loginAction(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
                
            } else{

                setIsLoggedIn(false);

            }
            
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking){
        return <div>
            <h1>Wait!...</h1>
        </div>
    }

    return (
        <div>

            <Router>
                <Switch>
                    <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isLoggedIn = {isLoggedIn}
                    />

                    <PrivateRoute
                    exact
                    path="/"
                    component={JournalPage}
                    isLoggedIn={isLoggedIn}
                    />
                </Switch>
            </Router>
        </div>
    )
}
