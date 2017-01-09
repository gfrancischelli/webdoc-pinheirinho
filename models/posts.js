const keystone = require('keystone'),
      Types = keystone.Field.Types,
      path = require('path');

const Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'título', unique: true },
    map: { name: 'título' },
    defaultSort: '-createdAt',
});

const postStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/images/news'),
    publicPath: '/public/images/news',
  },
});

const pdfStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/pdf'),
    publicPath: '/public/pdf',
  },
});

Post.schema.virtual('url').get(function() {
    return `/noticias/${ this.slug }`
});

Post.schema.virtual('heroUrl').get(function() {
    return `images/news/${ this.heroImage.filename }`
});

Post.add({
    title: { type: String, initial: true, required: true, label: 'Título' },
    tipo: { type:Types.Select, options: 'timeline, notícia', initial: true, required: true},
    data: { type: Types.Date, format: 'D M YYYY', dependsOn: { tipo: 'timeline' }, label: 'Data'  },
    time: { type: String, dependsOn: { tipo: 'timeline' }, label: 'Horário' },
    status: {
      type: Types.Select, options: 'rascunho, publicado, arquivado',
      default: 'rascunho', required: true, dependsOn: { tipo: 'notícia' }
    },
    pdf: {
      type: Types.File,
      storage: pdfStorage,
    },
    categoria: {
      type: Types.Select, options: 'importante, judicial, exemplo',
      dependsOn: { tipo: 'timeline' },
    },
    heroImage: {
        type: Types.File,
        storage: postStorage,
        label: 'Foto de capa',
    },
    video: { type: Types.Url },
    flicker: { type: Types.Url },
    author: { type: String, dependsOn: { tipo: 'noticía' }, label: 'Autor' },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
    createdAt: { type: Types.Date, default: Date.now, dependsOn: { tipo: 'notícia' } },
    publishedAt: { type: Types.Date, dependsOn: { tipo: 'notícia' } } ,
});

Post.defaultColumns = 'title, tipo|10%, status|10%, publishedAt|10%';

Post.register();
