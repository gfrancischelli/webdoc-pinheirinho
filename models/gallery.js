const keystone = require('keystone'),
      Types = keystone.Field.Types;

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
        path: 'public/images/galleries',
        publicPath: 'public/images/galleries',
    },
});

Gallery.schema.virtual('url').get(function() {
    return `/galerias/${ this.slug }`
});

Gallery.schema.virtual('heroUrl').get(function() {
    return `public/images/galleries/${ this.heroImage.filename }`
})

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
    publishedAt: { type: Types.Date, default: Date.now },
    createdAt: { type: Types.Date, default: Date.now },
});

Gallery.defaultColumns = 'title, publishedDate, createdAt';

Gallery.register();
