import {SET_PLAYGROUND_SIZE, SET_SCORE, SET_SPEED} from "./actionTypes";

export const setPlaygroundSize = (newWidth, newHeight, blockSizeInPx) => ({
    type: SET_PLAYGROUND_SIZE,
    payload: {
        gridSizeInBlocks: {
            width: parseInt((newWidth / blockSizeInPx.width), 10),
            height: parseInt((newHeight / blockSizeInPx.height), 10)
        }
    }
});

export const setSpeed = (newSpeed) => ({
    type: SET_SPEED,
    payload: {
        speedInMs: newSpeed
    }
});

export const setScore = (newScore) => ({
    type: SET_SCORE,
    payload: {
        score: newScore
    }
});