import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Food from './Food';
import SnakeHead from './SnakeHead';
import SnakeTail from './SnakeTail';
import {extendSnakeTail, movePlayer, randomizePlayer, setPlayerVelocity} from '../actions/player';
import {randomizeFood} from '../actions/food';
import {setPlaygroundSize, setScore, setSpeed} from '../actions/game';
import playgroundBackground from '../assets/images/playground-background.jpg';
import {VALID_MOVES} from "../helpers/constants";
import Swipeable from 'react-swipeable'

class Playground extends Component {

    static propTypes = {
        blockSizeInPx: PropTypes.objectOf(PropTypes.number).isRequired,
        foodGridPosition: PropTypes.objectOf(PropTypes.number).isRequired,
        gridSizeInBlocks: PropTypes.objectOf(PropTypes.number).isRequired,
        currentDirectionKey: PropTypes.string,
        playgroundWidthInPx: PropTypes.number.isRequired,
        playgroundHeightInPx: PropTypes.number.isRequired,
        snakeHeadGridPositions: PropTypes.objectOf(PropTypes.number).isRequired,
        snakeTailGridPositions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)),
        snakeVelocity: PropTypes.objectOf(PropTypes.number).isRequired,
        speedInMs: PropTypes.number,
        score: PropTypes.number,
        extendSnakeTail: PropTypes.func,
        movePlayer: PropTypes.func.isRequired,
        randomizeFood: PropTypes.func,
        randomizePlayer: PropTypes.func,
        setPlayerVelocity: PropTypes.func,
        setPlaygroundSize: PropTypes.func.isRequired,
        setSpeed: PropTypes.func,
        setScore: PropTypes.func
    };

    timer = null;

    componentDidMount() {
        const {randomizeFood, gridSizeInBlocks, randomizePlayer} = this.props;

        randomizePlayer(gridSizeInBlocks);
        randomizeFood(gridSizeInBlocks);
        this.refs.playground.focus();
    }

    componentWillReceiveProps(nextProps) {
        const {
            currentDirectionKey, movePlayer, snakeHeadGridPositions,
            snakeVelocity, gridSizeInBlocks, snakeTailGridPositions,
            speedInMs
        } = nextProps;

        this.handleCollisions(nextProps);

        if (currentDirectionKey) {
            !!this.timer && clearTimeout(this.timer);

            this.timer = setTimeout(() => movePlayer(
                snakeHeadGridPositions, gridSizeInBlocks, snakeVelocity, snakeTailGridPositions), 1000 / speedInMs);
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    getPlaygroundStyle() {
        const {playgroundWidthInPx, playgroundHeightInPx} = this.props;

        return {
            width: playgroundWidthInPx,
            height: playgroundHeightInPx,
            position: 'absolute',
            top: 32,
            left: 0,
            right: 0,
            bottom: 0,
            margin: '0 auto',
            backgroundImage: `url(${playgroundBackground})`,
            backgroundColor: 'saddlebrown',
            outline: 'none',
            borderRadius: '15px',
            border: '20px solid black'
        }
    };

    onKeyDown(e) {
        return VALID_MOVES.all.find(validKey => validKey === e.key) && this.props.setPlayerVelocity(e.key);
    }

    getSnakeTail() {
        return this.props.snakeTailGridPositions.map(({x, y}, i) => (
            <SnakeTail key={i} gridPositionX={x} gridPositionY={y}/>
        ))
    };

    checkCollisions(...objectsGridPositionsArray) {
        const {snakeHeadGridPositions: {x, y}} = this.props;

        return objectsGridPositionsArray.find(obj => {
            return (x === obj.x) && (y === obj.y)
        });
    }

    handleCollisions(nextProps) {
        const {
            foodGridPosition, gridSizeInBlocks, snakeTailGridPositions,
            speedInMs, score, randomizeFood,
            extendSnakeTail, setSpeed, setScore
        } = nextProps;

        // Food
        this.checkCollisions(foodGridPosition)
        && randomizeFood(gridSizeInBlocks)
        && extendSnakeTail(snakeTailGridPositions)
        && setSpeed(speedInMs + 1)
        && setScore(score + 10);
    };

    handleSwipe(direction) {
        return VALID_MOVES.all.find(validKey => validKey === direction) && this.props.setPlayerVelocity(direction);
    }

    render() {
        const {snakeHeadGridPositions, foodGridPosition} = this.props;

        return (
            <Swipeable onSwipedLeft={() => this.handleSwipe('a')} onSwipedUp={() => this.handleSwipe('w')}
                       onSwipedDown={() => this.handleSwipe('s')} onSwipedRight={() => this.handleSwipe('d')}>
                <div className='playground' ref='playground' style={this.getPlaygroundStyle()}
                     onKeyDown={(e) => this.onKeyDown(e)} tabIndex='0'>
                    <Food foodGridPosition={foodGridPosition}/>
                    <SnakeHead snakeHeadGridPositions={snakeHeadGridPositions}/>
                    {this.getSnakeTail()}
                </div>
            </Swipeable>
        );
    }
}

const mapStateToProps = ({game, player, food}) => {
    const {gridSizeInBlocks, blockSizeInPx, speedInMs, score} = game;
    const {currentDirectionKey, snakeHeadGridPositions, snakeVelocity, snakeTailGridPositions} = player;
    const {foodGridPosition} = food;

    return {
        blockSizeInPx,
        foodGridPosition,
        gridSizeInBlocks,
        currentDirectionKey,
        playgroundWidthInPx: blockSizeInPx.width * gridSizeInBlocks.width,
        playgroundHeightInPx: blockSizeInPx.height * gridSizeInBlocks.height,
        snakeHeadGridPositions,
        snakeTailGridPositions,
        snakeVelocity,
        speedInMs,
        score
    }
};

export default connect(mapStateToProps, {
    extendSnakeTail,
    movePlayer,
    randomizeFood,
    randomizePlayer,
    setPlayerVelocity,
    setPlaygroundSize,
    setSpeed,
    setScore
})(Playground);