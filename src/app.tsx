import React from 'react';
import ReactDOM from 'react-dom';
import 'ress';
import 'react-toastify/dist/ReactToastify.css';

const render = () => {
  const App = require('./components/App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App');
}
