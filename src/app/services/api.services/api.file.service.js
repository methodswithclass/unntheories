import * as http from './api.client';

export const getBlogfromFile = (file) => {
  const filePath = `/asset/files/${file}`;

  return http.get({ url: filePath }).then((res) => res.data);
};
