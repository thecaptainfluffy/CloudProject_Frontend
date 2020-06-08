export function changeSkyColor(color) {
    if(isColorValid(color)) {
        return {
            type: "CHANGE_SKY_COLOR",
            payload: color
        }
    } else {
        return {
            type: "ABORT"
        }
    }
}
export function changeRoofColor(color) {
    if(isColorValid(color)) {
        return {
            type: "CHANGE_ROOF_COLOR",
            payload: color
        }
    } else {
        return {
            type: "ABORT"
        }
    }
}
export function changeWallColor(color) {
    if(isColorValid(color)) {
        return {
            type: "CHANGE_WALL_COLOR",
            payload: color
        }
    } else {
        return {
            type: "ABORT"
        }
    }
}
export function changeDoorColor(color) {
    if(isColorValid(color)) {
        return {
            type: "CHANGE_DOOR_COLOR",
            payload: color
        }
    } else {
        return {
            type: "ABORT"
        }
    }
}
export function changeGrassColor(color) {
    if(isColorValid(color)) {
        return {
            type: "CHANGE_GRASS_COLOR",
            payload:color
        }
    } else {
        return {
            type: "ABORT"
        }
    }
}
export function resetColors() {
    return {
        type: "RESET_COLOR"
    }
}
function isColorValid(color) {
    var s = new Option().style;
    s.color = color;
    return s.color === color;
}