import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './Header';
import Routes from '../routes/Routes';

const App: FC = () => (
  <RecoilRoot>
    <Router>
      <Header />
      <Routes />
    </Router>
  </RecoilRoot>
);

export default App;
