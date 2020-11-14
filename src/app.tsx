import React from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'rsuite';
import 'rsuite/lib/styles/index.less';

const render = () => {
  // Hot Module Replacement
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require('./components/app/App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/app/App', render);
}

Alert.config({
  duration: 5000,
});
