import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {NAVBAR_HEIGHT} from "../helpers/constants";

class Navbar extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        score: PropTypes.number
    };

    getScoreStyle() {
        return {
            position: 'absolute',
            right: 25,
            top: 18,
            color: 'white',
            zIndex: 1101,
            fontWeight: 400
        }
    }

    render() {
        const {title, score} = this.props;

        return (
            <div className='navbar'>
                <h2 className='score' style={this.getScoreStyle()}>{`Score: ${score}`}</h2>
                <AppBar title={title}
                        showMenuIconButton={false}
                        style={{height: NAVBAR_HEIGHT, backgroundColor: '#000000b3'}}>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = ({game: score}) => (score);

export default connect(mapStateToProps)(Navbar);