import { combineReducers } from "redux";

import worldState from "./worldReducer";
import pageState from "./pageReducer";

export default combineReducers ({
    world: worldState,
    page: pageState
})