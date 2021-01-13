import React from 'react';
import RootStoreProvider from './store/RootStoreProvider';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import { RepositoryFilters, RepositoryList, Navbar } from './components';

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
