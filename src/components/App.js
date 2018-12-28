import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Playground from './Playground';
import Navbar from './Navbar';
import {setPlaygroundSize} from '../actions/game';
import {
    SCREEN_BOTTOM_MARGIN,
    SCREEN_LEFT_MARGIN,
    SCREEN_RIGHT_MARGIN,
    SCREEN_TOP_MARGIN,
    NAVBAR_HEIGHT
} from '../helpers/constants';
import wallpaper from '../assets/images/wallpaper.jpg';

class App extends Component {

    static propTypes = {
        blockSizeInPx: PropTypes.objectOf(PropTypes.number).isRequired,
        setPlaygroundSize: PropTypes.func.isRequired
    };

    componentWillMount() {
        const {blockSizeInPx, setPlaygroundSize} = this.props;
        const fixedGridSize = {
            width: (window.innerWidth - (SCREEN_LEFT_MARGIN + SCREEN_RIGHT_MARGIN)),
            height: (window.innerHeight - (NAVBAR_HEIGHT + SCREEN_TOP_MARGIN + SCREEN_BOTTOM_MARGIN))
        };

        window.addEventListener('resize', () => window.location.reload());

        setPlaygroundSize(fixedGridSize.width, fixedGridSize.height, blockSizeInPx)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    getGameStyles() {
        return {
            height: '100%',
            backgroundColor: 'green',
            backgroundImage: `url(${wallpaper})`,
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
        }
    }

    getMainAreaStyles() {
        return {
            position: 'relative',
            textAlign: 'center'
        }
    }

    render() {
        return (
            <div className='game' style={this.getGameStyles()}>
                <Navbar title='React-Redux-Snake'/>
                <div className='main-area' style={this.getMainAreaStyles()}>
                    <Playground/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({game: blockSizeInPx}) => (blockSizeInPx);

export default connect(mapStateToProps, {setPlaygroundSize})(App);
