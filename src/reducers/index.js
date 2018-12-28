import {combineReducers} from 'redux';

import food from './food'
import game from './game';
import player from './player';

const rootReducer = combineReducers({
    food,
    game,
    player
});
export default rootReducer;