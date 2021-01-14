import React, { ChangeEvent, useEffect } from 'react';

import { observer } from 'mobx-react';
import styled from 'styled-components';

import { useRootStore } from '../store/RootStoreProvider';
import { SortType } from '../types/repositoryTypes';

import { Repository } from '.';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const RepositoryList = observer(() => {
  const { repositoryStore } = useRootStore();

  useEffect(() => {
    Promise.all([repositoryStore.fetchLanguages(), repositoryStore.fetchRepositories()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReFetch = async () => {
    await repositoryStore.fetchRepositories();
  };

  const handleSortChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    repositoryStore.setSort(evt.target.value as SortType);
  };

  return (
    <Container>
      <SortWrapper>
        Sort by stars:
        <select value={repositoryStore.sort} onChange={handleSortChange}>
          <option value={SortType.ASC}>ASC</option>
          <option value={SortType.DESC}>DESC</option>
        </select>
      </SortWrapper>
      {repositoryStore.error && (
        <div>
          Error:
          <button onClick={handleReFetch}>Renew {repositoryStore.loading && '◌'}</button>
        </div>
      )}
      {repositoryStore.loading && <div>Loading...</div>}
      <Wrapper>
        {!repositoryStore.loading &&
          !repositoryStore.error &&
          repositoryStore.repositoriesSortedByStars.map((schema) => <Repository {...schema} />)}
      </Wrapper>
    </Container>
  );
});

export default RepositoryList;
