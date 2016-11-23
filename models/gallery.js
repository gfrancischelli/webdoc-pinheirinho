const keystone = require('keystone'),
      Types = keystone.Field.Types;

const Gallery = new keystone.List('Gallery', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'tite' },
    defaultSort: '-createdAt',
    singular: 'Album',
    plural: 'Albums',
});

Gallery.schema.virtual('url').get(function() {
    return `/galerias/${ this.slug }`
});

const galleryStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: 'uploads/galleries',
        publicPath: '/uploads/galleries',
    },
});

Gallery.add({
    title: { type: String, initial: true, required: true },
    heroImage: { 
        type: Types.File,
        storage: galleryStorage,
    },
    images: {
        type: Types.CloudinaryImages,
        publicID: 'slug',
        autoCleanup: true,
    },
    publishedDate: { type: Types.Date, default: Date.now },
    createdAt: { type: Types.Date, default: Date.now },
});

Gallery.defaultColumns = 'title, publishedDate, createdAt';

Gallery.register();
