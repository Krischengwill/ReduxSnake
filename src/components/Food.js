import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import appleImg from '../assets/images/apple.png';

class Food extends PureComponent {

    static propTypes = {
        foodGridPosition: PropTypes.objectOf(PropTypes.number).isRequired
    };

    getFoodStyle() {
        const {blockSizeInPx, foodGridPosition} = this.props;

        return {
            width: blockSizeInPx.width,
            height: blockSizeInPx.height,
            position: 'absolute',
            display: 'inline-block',
            left: foodGridPosition.x * blockSizeInPx.width,
            top: foodGridPosition.y * blockSizeInPx.height
        }
    }

    render() {
        return (
            <img src={appleImg} alt="apple" style={this.getFoodStyle()}/>
        )
    }
}

const mapStateToProps = ({game: {blockSizeInPx, gridSizeInBlocks}}) => ({
    blockSizeInPx, gridSizeInBlocks
});

export default connect(mapStateToProps)(Food);