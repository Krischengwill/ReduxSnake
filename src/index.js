import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './shared/reset.css';
import './shared/global.css';
import Store from './store';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'typeface-roboto';
import './assets/fonts/font-awesome.css';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={Store()}>
            <App/>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));

registerServiceWorker();
