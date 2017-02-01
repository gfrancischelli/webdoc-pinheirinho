const keystone = require('keystone'),
      Types = keystone.Field.Types,
      path = require('path');

const Gallery = new keystone.List('Gallery', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'tite' },
    defaultSort: '-createdAt',
    singular: 'Album',
    plural: 'Albums',
});

const galleryStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./uploads/images/galleries'),
        publicPath: '/public/uploads/images/galleries',
    },
    schema: {
      originalname: true,
      url: true,
    },
});

Gallery.schema.virtual('url').get(function() {
    return `/galerias/${ this.slug }`
});

Gallery.schema.virtual('heroUrl').get(function() {
    return `images/galleries/${ this.heroImage.filename }`
})

Gallery.add({
    title: { type: String, initial: true, required: true, label: 'Título' },
    desc: { 
      type: Types.Html,
      wysiwyg: true,
      label: 'Descrição',
    },
    cover: { 
        type: Types.File,
        storage: galleryStorage,
        label: 'Foto de capa',
    },
});

Gallery.defaultColumns = 'title, createdAt';

Gallery.register();
