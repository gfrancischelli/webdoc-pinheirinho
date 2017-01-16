const keystone = require('keystone'),
      Types = keystone.Field.Types,
      path = require('path');

const Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-data',
});

const postStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./uploads/images/posts'),
    publicPath: '/public/uploads/images/posts',
  },
  schema: {
    originalname: true,
    url: true,
  },
});

const pdfStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./uploads/pdf'),
    publicPath: '/public/pdf',
  },
  schema: {
    originalname: true,
    url: true,
  },
});

Post.add({
    title: { type: String, initial: true, required: true, label: 'Título' },
    data: { 
      type: Types.Date,
      format: 'D M YYYY',
      initial: true,
      required: true,
      label: 'Data'
    },
    time: { type: String, label: 'Horário' },
    pdf: {
      type: Types.File,
      storage: pdfStorage,
    },
    category: {
      label: 'Categoria',
      type: Types.Select,
      options: 'importante, judicial, exemplo',
    },
    cover: {
      type: Types.File,
      storage: postStorage,
      label: 'Foto de capa',
    },
    video: { type: Types.Url, label: 'Vídeo' },
    flicker: { type: Types.Url },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Post.defaultColumns = 'title, data|30%';

Post.register();
