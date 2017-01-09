export const concatArray = (arr, el) => arr.concat(el);

export const imageURL = (type, filename) =>
  `/images/${ type }/${ filename }`;

export const resourceURL = (type, slug) =>
  `/${ type }/${ slug }`;
