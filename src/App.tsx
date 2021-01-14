import React from 'react';

import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

import { Navbar, RepositoryFilters, RepositoryList } from './components';
import RootStoreProvider from './store/RootStoreProvider';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <RootStoreProvider>
      <Reset />
      <GlobalStyle />
      <Navbar />
      <RepositoryFilters />
      <RepositoryList />
    </RootStoreProvider>
  );
};

export default App;
