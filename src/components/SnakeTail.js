import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SnakeTail extends PureComponent {

    static propTypes = {
        gridPositionX: PropTypes.number.isRequired,
        gridPositionY: PropTypes.number.isRequired,
        blockSizeInPx: PropTypes.objectOf(PropTypes.number).isRequired
    };

    getSnakeTailStyle() {
        const {blockSizeInPx, gridPositionX, gridPositionY} = this.props;

        return {
            width: blockSizeInPx.width,
            height: blockSizeInPx.height,
            backgroundColor: '#EE3814',
            position: 'absolute',
            display: 'inline-block',
            left: gridPositionX * blockSizeInPx.width,
            top: gridPositionY * blockSizeInPx.height,
            borderRadius: '20%',
            border: '1px solid black'
        }
    };

    render() {
        return (
            <div style={this.getSnakeTailStyle(this.props)}/>
        );
    }
}

const mapStateToProps = ({game: {blockSizeInPx}}) => ({
    blockSizeInPx
});

export default connect(mapStateToProps)(SnakeTail);