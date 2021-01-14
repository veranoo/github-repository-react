import React from 'react';

import styled from 'styled-components';

import { RepositorySchema } from '../types/repositoryTypes';

const RepositoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  flex: 0 0 24%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
  height: 300px;
  border: solid 1px #e7e7e7;
  margin: 10px 0;
`;

const StartStyled = styled.div`
  margin-top: 10px;
`;

const DescriptionStyled = styled.p`
  font-size: 0.8rem;
  line-height: 1.5;
  margin-top: 10px;
  color: #373737;
`;

const NameStyled = styled.h1`
  background: #000;
  color: #fff;
  text-decoration: none;
  padding: 5px;
  margin-top: 10px;
  text-align: center;
`;

const AuthorStyled = styled.div`
  background: #000;
  color: #fff;
  textdecoration: none;
  padding: 7px;
  margin-left: -20px;
`;

const AuthorWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

const Repository: React.FC<RepositorySchema> = ({ name, author, stars, avatar, url, description }) => (
  <RepositoryStyled>
    <AuthorWrapperStyled>
      <a href={url} target={'_blank'} rel='noreferrer'>
        <img width={80} src={avatar} alt='' />
      </a>
      <a href={url} target={'_blank'} rel='noreferrer'>
        <AuthorStyled>{author}</AuthorStyled>
      </a>
    </AuthorWrapperStyled>
    <a href={url} target={'_blank'} rel='noreferrer'>
      <NameStyled>{name}</NameStyled>
    </a>
    <StartStyled>⭑ {stars}</StartStyled>
    <DescriptionStyled>{description}</DescriptionStyled>
  </RepositoryStyled>
);

export default Repository;
