import {SET_PLAYGROUND_SIZE, SET_SCORE, SET_SPEED} from "../actions/actionTypes";
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
    blockSizeInPx: {width: 32, height: 32},
    gridSizeInBlocks: {width: 0, height: 0},
    speedInMs: 10,
    score: 0
});

export default (state = defaultState, {type, payload}) => {
    switch (type) {
        case SET_PLAYGROUND_SIZE:
        case SET_SCORE:
        case SET_SPEED:
            return {...state, ...payload};
        default:
            return state
    }
};