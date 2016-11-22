const keystone = require('keystone'),
      Types = keystone.Field.Types;

const Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt', 
});

Post.schema.virtual('url').get(function() {
    return `/noticias/${this.slug}`
})

const postStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: 'uploads/posts',
    publicPath: '/posts',
  },
});

Post.add({
    title: { type: String, required: true },
    status: { type: Types.Select, options: 'rascunho, publicado, arquivado', default: 'rascunho' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    cover: { 
        type: Types.File,
        storage: postStorage,
    },
    desc: { type: Types.Html, wysiwyg: true, height: 150 },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Post.defaultColumns = 'title, status|20%, author|20%, publishedAt|20%';

Post.register();
