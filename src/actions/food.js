import {RANDOMIZE_FOOD} from "./actionTypes";

export const randomizeFood = (gridSizeInBlocks) => ({
    type: RANDOMIZE_FOOD,
    payload: {
        foodGridPosition: {
            x: Math.floor(Math.random() * (gridSizeInBlocks.width - 1)),
            y: Math.floor(Math.random() * (gridSizeInBlocks.height - 1))
        }
    }
});