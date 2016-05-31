var Gallery = {
    init: function (config) {
        this._collectData(config);
        this._initGallery();
    },

    _collectData: function (config) {
        this._$gallery = $(config.id);
        this._$config = config;
    },

    _initGallery: function () {
        this._$gallery.lightGallery(
            {
                mode: this._$config.mode,
                selector: this._$config.selector
            }
        );
    },

    updateGallery: function () {
        this._$gallery.data("lightGallery").destroy(true);
        this._initGallery();
    }
};

$(function () {
    Gallery.init(
        {
            id: "#js-gallery",
            mode: "lg-slide-circular",
            selector: ".gallery-image.js-gallery-image"
        }
    );
});
