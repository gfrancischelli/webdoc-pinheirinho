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
    "título": { type: String, initial: true, required: true },
    "tipo": { type:Types.Select, options: 'timeline, noticía', initial: true, required: true},
    "data": { type: Types.Date, format: 'D M YYYY', dependsOn: { tipo: 'timeline' }  },
    "horário": { type: String, dependsOn: { tipo: 'timeline' } },
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
        label: 'foto de capa',
    },
    "vídeo": { type: Types.Url },
    flicker: { type: Types.Url },
    autor: { type: String, dependsOn: { tipo: 'noticía' } },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
    createdAt: { type: Types.Date, default: Date.now, dependsOn: { tipo: 'notícia' } },
    publishedAt: { type: Types.Date, dependsOn: { tipo: 'notícia' } } ,
});

Post.defaultColumns = 'título, tipo|10%, status|10%, publishedAt|10%';

Post.register();
