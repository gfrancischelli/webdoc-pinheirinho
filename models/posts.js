const keystone = require('keystone'),
      Types = keystone.Field.Types,
      path = require('path');

const Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt', 
});

const postStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/images/news'),
    publicPath: '/public/images/news',
  },
});

Post.schema.virtual('url').get(function() {
    return `/noticias/${ this.slug }`
});

Post.schema.virtual('heroUrl').get(function() {
    return `public/images/news/${ this.heroImage.filename }`
});

Post.add({
    title: { type: String, required: true },
    status: { type: Types.Select, options: 'rascunho, publicado, arquivado', default: 'rascunho' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    heroImage: { 
        type: Types.File,
        storage: postStorage,
    },
    desc: { type: Types.Html, wysiwyg: true, height: 150 },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Post.defaultColumns = 'title, status|20%, author|20%, publishedAt|20%';

Post.register();
