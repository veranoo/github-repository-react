import React, { ChangeEvent, useContext } from 'react';
import { observer } from 'mobx-react';
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

const periods = [Since.DAILY, Since.MONTHLY, Since.WEEKLY];

export const RepositoryFilters = observer(() => {
  const { repositoryStore } = useContext(RootStoreContext);
  const handleChangeRadio = (evt: ChangeEvent<HTMLInputElement>) => {
    repositoryStore.setSince(evt.target.value as Since);
  };

  const handleChangeLanguage = (evt: ChangeEvent<HTMLSelectElement>) => {
    repositoryStore.setLanguage(evt.target.value);
  };

  return (
    <Wrapper>
      <SinceWrapper>
        Since:
        <RadioWrapper>
          {periods.map((period) => (
            <>
              <input
                type='radio'
                id={period}
                value={period}
                checked={repositoryStore.since === period}
                onChange={handleChangeRadio}
              />
              <label htmlFor={period}>{period}</label>
            </>
          ))}
        </RadioWrapper>
      </SinceWrapper>
      <div>
        Choose language:
        <select value={repositoryStore.language ?? ''} onChange={handleChangeLanguage}>
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
