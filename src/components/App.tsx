import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import Header from './Header';
import Routes from './routes/Routes';

const App: FC = () => (
  <RecoilRoot>
    <Router>
      <Header />
      <Routes />
      <ToastContainer />
    </Router>
  </RecoilRoot>
);

export default App;
