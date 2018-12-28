import {EXTEND_TAIL, MOVE_PLAYER, SET_VELOCITY, RANDOMIZE_PLAYER} from "./actionTypes";
import {VALID_MOVES} from "../helpers/constants";
import {
    getNewSnakeHeadGridPosition,
    newGridPositionIfPlaygroundExceeded,
    moveTail,
    extendTail
} from '../helpers/player';

export const movePlayer = (currentHeadGridPositions, gridSizeInBlocks, snakeVelocity, snakeTailGridPositions) => {
    const tempSnakeHeadX = getNewSnakeHeadGridPosition(snakeVelocity.x, currentHeadGridPositions.x);
    const tempSnakeHeadY = getNewSnakeHeadGridPosition(snakeVelocity.y, currentHeadGridPositions.y);
    const newSnakeHeadX = newGridPositionIfPlaygroundExceeded(tempSnakeHeadX, gridSizeInBlocks.width);
    const newSnakeHeadY = newGridPositionIfPlaygroundExceeded(tempSnakeHeadY, gridSizeInBlocks.height);

    return {
        type: MOVE_PLAYER,
        payload: {
            snakeHeadGridPositions: {x: newSnakeHeadX, y: newSnakeHeadY},
            snakeTailGridPositions: moveTail(snakeTailGridPositions, currentHeadGridPositions)
        }
    }
};

export const setPlayerVelocity = (directionKey) => ({
    type: SET_VELOCITY,
    payload: {
        currentDirectionKey: directionKey,
        snakeVelocity: {x: VALID_MOVES.x[directionKey], y: VALID_MOVES.y[directionKey]}
    }
});

export const extendSnakeTail = (snakeTailGridPositions) => ({
    type: EXTEND_TAIL,
    payload: {
        snakeTailGridPositions: extendTail(snakeTailGridPositions)
    }
});

export const randomizePlayer = (gridSizeInBlocks) => ({
    type: RANDOMIZE_PLAYER,
    payload: {
        snakeHeadGridPositions: {
            x: Math.floor(Math.random() * (gridSizeInBlocks.width - 1)),
            y: Math.floor(Math.random() * (gridSizeInBlocks.height - 1))
        }
    }
});