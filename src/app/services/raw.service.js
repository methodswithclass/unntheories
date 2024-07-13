const genres = {
  genres: [
    {
      id: 'blogs',
      title: 'Writings',
      map: 'nonFict',
      order: 1,
    },
    {
      id: 'poetry',
      title: 'Rhymings',
      map: 'poetry',
      order: 2,
    },
  ],
  nonFict: 'blogs',
  poetry: 'poetry',
};

const published = {
  none: false,
};

export const getRaw = () => {
  return [];
};

export const getGenres = () => {
  return genres;
};

export const getPublished = () => {
  return published;
}
