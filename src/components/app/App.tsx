import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './Header';
import Routes from '../routes/Routes';
import Footer from './Footer';

const App: FC = () => (
  <RecoilRoot>
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  </RecoilRoot>
);

export default App;
