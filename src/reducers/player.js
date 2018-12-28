import {EXTEND_TAIL, MOVE_PLAYER, SET_VELOCITY, RANDOMIZE_PLAYER} from "../actions/actionTypes";
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
    currentDirectionKey: null,
    snakeHeadGridPositions: {x: 0, y: 0},
    snakeTailGridPositions: [],
    snakeVelocity: {x: 0, y: 0}
});

export default (state = defaultState, {type, payload}) => {
    switch (type) {
        case EXTEND_TAIL:
        case MOVE_PLAYER:
        case SET_VELOCITY:
        case RANDOMIZE_PLAYER:
            return {...state, ...payload};
        default:
            return state;
    }
};