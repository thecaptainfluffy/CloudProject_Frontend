import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import * as Page from '../../Actions/PageActions';
import "./Admin.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const auth = firebase.auth();
const database = firebase.database();
export function Admin({account, logout}) {
    let history = useHistory();
    const [allLogs, setAllLogs] = useState([]);
    
    if(account.email !== "simon.westerdahl91@gmail.com")
        history.push("/");
        
    useEffect(() => {
        const subscriber = database;
        subscriber.ref('/log_entries').once("value", snapshot => {
            if(snapshot.val() != null) {
            const log_entries = Object.entries(snapshot.exportVal());  
            setAllLogs(log_entries);
            }
        })
    }, []);
    function logoutFireBase() {
        auth.signOut()
        .then(() => {
            logout();
        })
        .catch((error) => {
            alert(error);        
        })
        }
    function removeFromDB(value) {
        database.ref("/log_entries/" + value).remove()
        .then(() => {
            database.ref('/log_entries').once("value", snapshot => {
                if(snapshot.val() != null) {  
                    const log_entries = Object.entries(snapshot.exportVal());  
                    setAllLogs(log_entries);
                }
            })
        }).catch((error) => {
            alert(error.message)
        })
    }
    return (
        <div id="adminPage">
            <h1>Admin page</h1>
            <table>
            <tbody>
                <tr>
                    <th>Uid</th>
                    <th>Message</th>
                </tr>
                {allLogs && allLogs.map((item, key) => (
                    <tr key={item[0]}>
                        <td>{item[1].userId}</td>
                        <td>{item[1].data}</td>
                        <td><button onClick={() => removeFromDB(item[0])}>Remove</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            <Link to="/"><button>Go back to the world</button></Link><br />
            <button onClick={() => logoutFireBase()}>Logout</button> 
            
        </div>
    );
}

//Redux(global states) that should be included into the Home function
const mapStateToProps = (combineReducers) => ({
    account: combineReducers.page.account
});
//Actions that should be included into the Home function.  
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Page.logout()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin);