const keystone = require('keystone'),
      Types = keystone.Field.Types,
      path = require('path');

const New = new keystone.List('New', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt',
});

const newsStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./uploads/images/news'),
    publicPath: '/public/uploads/images/news',
  },
  schema: {
    originalname: true,
    url: true,
  },
})

console.log('keystone path : \n', keystone.expandPath('./uploads/images'))

New.add({
    title: { type: String, initial: true, required: true, label: 'Título' },
    status: {
      type: Types.Select,
      default: 'rascunho', required: true,
      options: 'rascunho, publicado, arquivado',
    },
    categoria: {
      type: Types.Select, options: 'importante, judicial, exemplo',
    },
    cover: {
        type: Types.File,
        storage: newsStorage,
        label: 'Foto de capa',
    },
    content: { 
      type: Types.Html,
      wysiwyg: true,
      height: 400,
      label: 'Texto',
    },
    createdAt: { type: Types.Date, default: Date.now },
    publishedAt: { type: Types.Date, label: 'Data de Publicação' },
});

New.defaultColumns = 'title, status|15%, publishedAt| 10%, createdAt|10%';

New.register();
