import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SnakeHead extends PureComponent {

    static propTypes = {
        snakeHeadGridPositions: PropTypes.objectOf(PropTypes.number).isRequired,
        blockSizeInPx: PropTypes.objectOf(PropTypes.number).isRequired
    };

    getSnakeHeadStyle() {
        const {blockSizeInPx, snakeHeadGridPositions} = this.props;

        return {
            width: blockSizeInPx.width,
            height: blockSizeInPx.height,
            backgroundColor: '#EE3814',
            position: 'absolute',
            display: 'inline-block',
            left: snakeHeadGridPositions.x * blockSizeInPx.width,
            top: snakeHeadGridPositions.y * blockSizeInPx.height,
            borderRadius: '40%',
            border: '1px solid black'
        }
    };

    render() {
        return (
            <div style={this.getSnakeHeadStyle()}/>
        );
    }
}

const mapStateToProps = ({game: {blockSizeInPx}}) => ({
    blockSizeInPx
});

export default connect(mapStateToProps)(SnakeHead);