export default function reducer(state={
    skyColor: "aqua",
    roofColor: "brown",
    wallColor: "lightgray",
    doorColor: "burlywood",
    grassColor: "greenyellow"
}, action) {
    switch(action.type) {
        case "CHANGE_SKY_COLOR":
            return {...state, skyColor: action.payload}
        case "CHANGE_ROOF_COLOR":
            return {...state, roofColor: action.payload}
        case "CHANGE_WALL_COLOR":
            return {...state, wallColor: action.payload}
        case "CHANGE_DOOR_COLOR":
            return {...state, doorColor: action.payload}
        case "CHANGE_GRASS_COLOR":
            return {...state, grassColor: action.payload}
        case "RESET_COLOR":
            return {...state, skyColor: "aqua",
            roofColor: "brown",
            wallColor: "lightgray",
            doorColor: "burlywood",
            grassColor: "greenyellow"}
        default:
            return state;
    }
}