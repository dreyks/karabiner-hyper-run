import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

render();

if (module.hot) {
  module.hot.accept('./App', render);
}
