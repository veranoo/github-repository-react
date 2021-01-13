import React, { createContext, useContext } from 'react';
import { useRepositoryStore } from '../hooks';
import { RepositoryStoreSchema } from '../types/repositoryTypes';

export type RootStoreSchema = {
  repositoryStore: RepositoryStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>({} as RootStoreSchema);

const RootStoreProvider: React.FC = ({ children }) => {
  const repositoryStore = useRepositoryStore();

  return (
    <RootStoreContext.Provider
      value={{
        repositoryStore
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => useContext(RootStoreContext);

export default RootStoreProvider;
