import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './Header';
import Routes from '../routes/Routes';
import Footer from './Footer';
import styled from '@emotion/styled';

const App: FC = () => (
  <RecoilRoot>
    <Router>
      <Header />
      <Layout>
        <Routes />
      </Layout>
      <Footer />
    </Router>
  </RecoilRoot>
);

export default App;

const Layout = styled.div`
  max-width: 980px;
  padding: 20px;
  margin: auto;
`;
