export interface BuiltByEntity {
  username: string;
  href: string;
  avatar: string;
}

export interface RepositorySchema {
  author: string;
  name: string;
  avatar: string;
  url: string;
  description: string;
  language?: string | null;
  languageColor?: string | null;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  builtBy?: BuiltByEntity[] | null;
}

export enum SortType {
  DESC = 'DESC',
  ASC = 'ASC'
}

export enum Since {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export type Language = {
  urlParam: string;
  name: string;
};

export type RepositoryStoreSchema = {
  repositoriesSortedByStars: RepositorySchema[];
  repositories: RepositorySchema[];
  language: string | null;
  sort: SortType;
  since: Since;
  languages: Language[];
  error: boolean;
  loading: boolean;
  setSince(since: Since): void;
  setLanguage(lang: string): void;
  setSort(sort: string): void;
  fetchRepositories(): Promise<void>;
  fetchLanguages(): Promise<void>;
};
