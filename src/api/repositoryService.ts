import qs from 'qs';
import { Language, RepositorySchema } from '../types/repositoryTypes';

const repositoryService = {
  fetchRepositories: ({ since, language }: { language: string | null; since: string }): Promise<RepositorySchema[]> => {
    const query = qs.stringify({
      language,
      since
    });
    return fetch(`/api/?${query}`).then((response) => response.json());
  },
  fetchLanguages: (): Promise<Language[]> => {
    return fetch('/api/languages').then((response) => response.json());
  }
};

export default repositoryService;
