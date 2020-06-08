import React from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import * as Page from '../../Actions/PageActions';
import { useForm } from "react-hook-form";
import "./Login.css";
import * as firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyB8QbgEGVPVGNRmbqwAmdg_Rw4jQLo25V4",
    authDomain: "cloud-project-274620.web.app",
    databaseURL: "https://cloud-project-274620.firebaseio.com/",
    projectId: "cloud-project-274620"
});

const auth = firebase.auth();
export function Login({email ,login, insertEmail, insertAccount}) {
    const {register, handleSubmit, errors} = useForm();
    function submit(data) {
        //Submit login
        auth.signInWithEmailAndPassword(data.email, data.password).catch((error) => {
            alert(error.message);
        }).then((success) => {
            if(success != null) {                
                insertAccount(success.user);
                login();
            }           
        });
    }
    const onSubmit = data => submit(data);
    return (
        <div id="loginPage">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h3>Email address</h3>
                <input name="email" value={email} onChange={(e) => insertEmail(e.target.value)} ref={register({required: true})} /><br />
                {errors.accname && <span>This field is required</span>}<br />
                <h3>Password</h3>
                <input type="password" name="password" ref={register({required: true})} /><br />
                {errors.password && <span>This field is required</span>}<br />
                <input type="submit" value="Login" /><br />
                <Link to="/register"><button>Register account</button></Link>            
            </form>
        </div>
    );
}

//Redux(global states) that should be included into the Home function
const mapStateToProps = (combineReducers) => ({
    email: combineReducers.page.email
});
//Actions that should be included into the Home function.  
const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(Page.login()),
    insertEmail: (value) => dispatch(Page.insertEmail(value)),
    insertAccount: (value) => dispatch(Page.insertAccount(value))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);