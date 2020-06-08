import React from 'react';
import { connect } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import * as Page from '../../Actions/PageActions';
import { useForm } from "react-hook-form";
import "./Register.css";
import firebase from "firebase";
import "firebase/auth";

const auth = firebase.auth();

export function Register({insertEmail}) {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    function submit(data) {
        if(data.password === data.confirmPassword) {
            auth.createUserWithEmailAndPassword(data.email, data.password).catch((error) => {
                alert(error);
            }).then((success) => {
                if(success != null) {
                    insertEmail(data.email);
                    history.push("/");
                }            
            });  
        } else {
            alert("Password and confirmed password needs to be the same");
        }      
    }
    const onSubmit = data =>submit(data);
    return (
        <div id="registerPage">
            <h1>Register account</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h3>Email</h3>
                <input name="email" ref={register({required: true})} /><br />
                {errors.email && <span>This field is required</span>}
                <h3>Password</h3>
                <input type="password" name="password" ref={register({required: true})} /><br />
                {errors.password && <span>This field is required</span>}
                <h3>Confirm password</h3>
                <input type="password" name="confirmPassword" ref={register({required: true})} /><br />
                {errors.confirmPassword && <span>This field is required</span>} <br />
                <input type="submit" value="Register user" /><br />
                <Link to="/"><button>Go back</button></Link>
            </form>
        </div>
    );
}
//Redux(global states) that should be included into the Home function
const mapStateToProps = (combineReducers) => ({

});
//Actions that should be included into the Home function.
const mapDispatchToProps = (dispatch) => ({
    insertEmail: (value) => dispatch(Page.insertEmail(value))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);