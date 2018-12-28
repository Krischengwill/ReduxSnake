export const getNewSnakeHeadGridPosition = (currentHeadGridPosition, velocity) => (
    currentHeadGridPosition + velocity
);

export const newGridPositionIfPlaygroundExceeded = (tempSnakeHeadGridPosition, gridMaxSizeInBlocks) => {
    if (tempSnakeHeadGridPosition < 0) return (gridMaxSizeInBlocks - 1);
    if (tempSnakeHeadGridPosition >= gridMaxSizeInBlocks) return 0;

    return tempSnakeHeadGridPosition;
};

export const moveTail = (snakeTailGridPositions, currentHeadGridPositions) => (
    [{x: currentHeadGridPositions.x, y: currentHeadGridPositions.y}, ...snakeTailGridPositions.slice(0, -1)]
);

export const extendTail = (snakeTailGridPositions) => (
    [...snakeTailGridPositions, snakeTailGridPositions[snakeTailGridPositions.length - 1]]
);