import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Album from './pets';
import App from './app'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();