export const concatArray = (arr, el) => arr.concat(el);

export const imageURL = (type, filename) =>
  `api/images/${ type }/${ filename }`;

export const resourceURL = (type, slug) => {
  let param = type;
  if (type == 'news') param = 'noticias';
  if (type == 'galleries') param = 'galerias';
  return `/${ param }/${ slug }`;
}
