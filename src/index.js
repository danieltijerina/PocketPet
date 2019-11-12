import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Album from './pets';

ReactDOM.render(<Album />, document.getElementById('root'));
registerServiceWorker();