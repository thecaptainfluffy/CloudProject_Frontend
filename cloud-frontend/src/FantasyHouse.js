import React from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//Imported NodeJS pages that will populate a website.
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Admin from './Pages/Admin';

//Middleware(bridge) action for changing global states in redux.
import * as Page from './Actions/PageActions';
import { logout } from './Actions/PageActions';

//Import firebase
import firebase from "firebase";
import "firebase/auth";

const auth = firebase.auth();

//Autologin if you're still logged in according to firebase authenatication.
export function FantasyHouse({active, login, insertEmail, insertAccount}) {
    auth.onAuthStateChanged((user) => {
        if(user) {
            insertEmail(user.email);
            insertAccount(user);
            login();
        } else {
            logout();
        }
    })

    /*
    Router will determine depending on if the user is active(logged in) and the path which page it will end up to.
    If the path is of unknown value, then it will automatic go to root.
    */
    return ( 
            <Router>
            {active ? //If world state is active:
                <Switch>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                </Switch>
                : // Else:
                <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
                </Switch>}
        </Router>
    );
}
const mapStateToProps = (combineReducers) => ({
    active: combineReducers.page.active
});
  
const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(Page.login()),
    insertEmail: (value) => dispatch(Page.insertEmail(value)),
    insertAccount: (value) => dispatch(Page.insertAccount(value))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FantasyHouse);