import Pages from 'constants/router';

type PathsType = Record<keyof typeof Pages, string>;

export const Paths: PathsType = Object.keys(Pages).reduce((cache: any, key: any) => {
  cache[key] = Pages[key as keyof typeof Pages].path.replace(/\/\[(.+?)\]/g, '');
  return cache;
}, {} as PathsType);
