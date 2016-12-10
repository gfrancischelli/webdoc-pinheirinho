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
        path: keystone.expandPath('./public/images/galleries'),
        publicPath: '/public/images/galleries',
    },
});

Gallery.schema.virtual('url').get(function() {
    return `/galerias/${ this.slug }`
});

Gallery.schema.virtual('heroUrl').get(function() {
    return `imgs/galleries/${ this.heroImage.filename }`
})

Gallery.add({
    title: { type: String, initial: true, required: true },
    desc: { type: String, required: true, default: 'descrição' },
    heroImage: { 
        type: Types.File,
        storage: galleryStorage,
    },
    images: {
        type: Types.CloudinaryImages,
        publicID: 'slug',
        autoCleanup: true,
    },
    createdAt: { type: Types.Date, default: Date.now },
});

Gallery.defaultColumns = 'title, createdAt';

Gallery.register();
