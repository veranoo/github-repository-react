import { useLocalObservable } from 'mobx-react';
import { observe, runInAction } from 'mobx';

import repositoryService from '../api/repositoryService';
import { RepositorySchema, RepositoryStoreSchema, Since, SortType } from '../types/repositoryTypes';

const useRepositoryStore = () => {
  const store = useLocalObservable<RepositoryStoreSchema>(() => ({
    repositories: [],
    sort: (localStorage.getItem('app:sort') as SortType) ?? SortType.ASC,
    language: localStorage.getItem('app:language'),
    since: (localStorage.getItem('app:since') as Since) ?? Since.DAILY,
    languages: [],
    error: false,
    loading: false,
    get repositoriesSortedByStars(): RepositorySchema[] {
      return [...store.repositories].sort((a, b) =>
        store.sort === SortType.DESC ? b.stars - a.stars : a.stars - b.stars
      );
    },
    setSort(sortType: SortType) {
      store.sort = sortType;
    },
    setLanguage(lang: string) {
      store.language = lang;
    },
    setSince(since: Since) {
      store.since = since;
    },
    async fetchLanguages(): Promise<void> {
      try {
        const languages = await repositoryService.fetchLanguages();
        runInAction(() => {
          store.languages = languages;
        });
      } catch (e) {}
    },
    async fetchRepositories(): Promise<void> {
      runInAction(() => {
        store.loading = true;
      });
      try {
        const repositories = await repositoryService.fetchRepositories({
          since: store.since,
          language: store.language
        });
        runInAction(() => {
          store.repositories = repositories;
          store.loading = false;
          store.error = false;
        });
      } catch (err) {
        runInAction(() => {
          store.loading = false;
          store.error = true;
        });
      }
    }
  }));

  observe(store, 'language', ({ newValue }) => {
    localStorage.setItem('app:language', newValue as string);
    store.fetchRepositories();
  });

  observe(store, 'since', ({ newValue }) => {
    localStorage.setItem('app:since', newValue as string);
    store.fetchRepositories();
  });

  observe(store, 'sort', ({ newValue }) => {
    localStorage.setItem('app:sort', newValue as string);
  });

  return store;
};

export default useRepositoryStore;
