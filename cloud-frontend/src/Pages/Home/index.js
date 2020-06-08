import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import * as Page from '../../Actions/PageActions';
import * as World from '../../Actions/WorldActions';
import "./Home.css";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
const auth = firebase.auth();
const database = firebase.database();

export function Home({account, skyColor, roofColor, wallColor, doorColor, grassColor, logout, changeSkyColor, changeRoofColor, changeWallColor, changeDoorColor, changeGrassColor, resetColors}) {
    /*
    When logout button is pressed.
    Then first it will reset the colors in the global redux states(This was the error that happend in the presentation)
    Then do the logout function that will logout the user from firebase and change global state.
    */
    function logoutFireBase() {
        auth.signOut()
        .then(() => {
            resetColors();
            logout();
        })
        .catch((error) => {
            alert(error);
            
        })
    }
    /*
    First word should be the type
    Second word is the color
    Go through the switch case and add the color.
    */
    function changeWorld(message) {
        var type = message.substr(0, message.indexOf(" "));
        var color = message.substr(message.indexOf(" ") + 1, message.length);
        switch(type.toLowerCase()) {
            case "sky":
                changeSkyColor(color);
                break;
            case "roof":
                changeRoofColor(color);
                break;
            case "wall":
                changeWallColor(color);
                break;
            case "door":
                changeDoorColor(color);
                break;
            case "grass":
                changeGrassColor(color);
                break;
            default:
                console.log(message);
                break;
                
        }
    }
    /*Listen to the realtime database. It will go include all newly added values that matches current users uid.
    The value will be sent to changeWorld that depending on command will change either the sky/roof/wall/door/grass colors.
    Android part verify it's only colors it can accepts. 
    */
    useEffect(() => {
        const subscriber = database;
        subscriber.ref('/log_entries').on("child_added", snapshot => {
            console.log(snapshot.val());
            if(auth.currentUser.uid === snapshot.val().userId) {
                console.log("Success");
                changeWorld(snapshot.val().data)
            }
        })
        return () => subscriber;
    }, [])

    return (
        <div id="home">
            <div id="sky" style={{backgroundColor:skyColor}}></div>
            <div id="roof" style={{borderBottom: "200px solid " + roofColor}}></div>
            <div id="wall" style={{backgroundColor:wallColor}}></div>
            <div id="door" style={{backgroundColor:doorColor}}></div>
            <div id="grass" style={{backgroundColor:grassColor}}></div>
            <button id="logout" onClick={() => logoutFireBase()}>Log out</button> 
            {account.email === "simon.westerdahl91@gmail.com" ? <Link to="/admin"><button id="admin">Admin page</button></Link> : null}
        </div>
    );
}

//Redux(global states) that should be included into the Home function
const mapStateToProps = (combineReducers) => ({
    account: combineReducers.page.account,
    skyColor: combineReducers.world.skyColor,
    roofColor: combineReducers.world.roofColor,
    wallColor: combineReducers.world.wallColor,
    doorColor: combineReducers.world.doorColor,
    grassColor: combineReducers.world.grassColor
});
  
//Actions that should be included into the Home function.
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Page.logout()),
    changeSkyColor: (color) => dispatch(World.changeSkyColor(color)),
    changeRoofColor: (color) => dispatch(World.changeRoofColor(color)),
    changeWallColor: (color) => dispatch(World.changeWallColor(color)),
    changeDoorColor: (color) => dispatch(World.changeDoorColor(color)),
    changeGrassColor: (color) => dispatch(World.changeGrassColor(color)),
    resetColors: () => dispatch(World.resetColors())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);