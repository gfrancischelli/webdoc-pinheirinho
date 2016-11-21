const keystone = require('keystone'),
      Types = keystone.Field.Types;

const Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt', 
});

const postStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: 'uploads/posts',
    publicPath: '/posts',
  },
});

Post.add({
    título: { type: String, initial: false, required: true },
    status: { type: Types.Select, options: 'rascunho, publicado, arquivado', default: 'rascunho' },
    autor: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    capa: { 
        type: Types.File,
        storage: postStorage,
    },
    resumo: { type: Types.Html, wysiwyg: true, height: 150 },
    conteúdo: { type: Types.Html, wysiwyg: true, height: 400 },
});

Post.defaultColumns = 'título, status|20%, autor|20%, publishedAt|20%';

Post.register();
