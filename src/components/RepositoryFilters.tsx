import { observer } from 'mobx-react';
import React, { ChangeEvent, useContext } from 'react';
import styled from 'styled-components';

import { RootStoreContext } from '../store/RootStoreProvider';
import { Since } from '../types/repositoryTypes';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
`;

const SinceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadioWrapper = styled.div`
  display: flex;
`;

const times = [
  {
    value: Since.DAILY
  },
  {
    value: Since.MONTHLY
  },
  {
    value: Since.WEEKLY
  }
];

export const RepositoryFilters = observer(() => {
  const { repositoryStore } = useContext(RootStoreContext);
  const handleChangeRadio = (evt: ChangeEvent<HTMLInputElement>) => {
    repositoryStore.setSince(evt.target.value as Since);
  };

  return (
    <Wrapper>
      <SinceWrapper>
        Since:
        <RadioWrapper>
          {times.map(({ value }) => (
            <div>
              <input
                type='radio'
                id={value}
                value={value}
                checked={repositoryStore.since === value}
                onChange={handleChangeRadio}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </RadioWrapper>
      </SinceWrapper>
      <div>
        Choose language:
        <select
          value={repositoryStore.lang ?? ''}
          onChange={(evt) => {
            repositoryStore.setLang(evt.target.value);
          }}
        >
          <option value={''}>-</option>
          {repositoryStore.languages.map(({ name, urlParam }) => (
            <option key={urlParam} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </Wrapper>
  );
});

export default RepositoryFilters;
