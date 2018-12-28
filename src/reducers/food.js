import {RANDOMIZE_FOOD} from "../actions/actionTypes";
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
    foodGridPosition: {x: 0, y: 0}
});

export default (state = defaultState, {type, payload}) => {
    switch (type) {
        case RANDOMIZE_FOOD:
            return {...state, ...payload};
        default:
            return state;
    }
};