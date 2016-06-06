'use strict';

var debug = false;

// TODO: документация и тесты
var Gallery = {
    init: function (config) {
        this._collectData(config);
        this._initGallery();
        this._bindEvents();
    },

    _collectData: function (config) {
        this._config = config;
        this._$gallery = $(this._config.id);
        this._$galleryImages = $('.js-gallery-images');
        this._$galleryImage = $('.js-gallery-image');
        this._$loadGif = $('.load-gif');
        this._offset = 8;
        this._end = false;
        this._$galleryImageClassName = this._$galleryImage.selector.replace('.', '');
        this._$galleryImageTags = $('.js-gallery-tags');
        this._$galleryImageTag = $('.js-gallery-tag');
        this._$options = $('input[name="tag-option"]');
        this._$option = $('input[name="tag-option"]:checked');
        this._$needNum = $('.js-hard-option-num');
        this._$galleryTags = $('.js-tags');
        this._$galleryTag = $('.js-tag');
        this._selectedTags = [];
    },

    _bindEvents: function () {
        this._$galleryTags.on('click', this._$galleryTag.selector, this._selectTag.bind(this));

        var _this = this;

        this._$options.on('click', function () {
            _this._$option = $('input[name="tag-option"]:checked');
            _this._updateGallery();
        });

        this._$needNum.on('change', function () {
            _this._$needNum = $('.js-hard-option-num');
            _this._updateGallery();
        });

        this._checkBottom(this._getImages.bind(this));
    },

    _initGallery: function () {
        this._$gallery.lightGallery(
            {
                mode: this._config.mode,
                selector: this._config.selector
            }
        );
    },

    _updateGallery: function () {
        var _this = this;

        if (this._selectedTags.length === 0) {
            this._$galleryImage.each(function () {
                _this._onImage(this);
            });
        } else {
            this._$galleryImage.each(function () {
                var $imageTagsBut = $(this)
                    .find(_this._$galleryImageTags.selector)
                    .find(_this._$galleryImageTag.selector);
                var imageTags = [];

                // Получили тэги для картинки
                $imageTagsBut.each(function () {
                    imageTags.push($(this).text());
                });

                // Проверяем совпадение
                switch (_this._$option.val()) {
                    case 'strict':
                        if ((_this._containsStrict(_this._selectedTags, imageTags)) &&
                            (_this._selectedTags.length === imageTags.length)) {
                            _this._onImage(this);
                        }
                        else {
                            _this._offImage(this);
                        }
                        break;
                    case 'not-strict':
                        if (_this._containsNotStrict(_this._selectedTags, imageTags)) {
                            _this._onImage(this);
                        }
                        else {
                            _this._offImage(this);
                        }
                        break;
                    case 'hard-option':
                        if (_this._containsHardOption(_this._selectedTags, imageTags, _this._$needNum.val())) {  // eslint-disable-line
                            _this._onImage(this);
                        }
                        else {
                            _this._offImage(this);
                        }
                }
            });
        }

        this._$gallery.data('lightGallery').destroy(true);
        this._initGallery();
    },

    _selectTag: function (e) {
        var $elem = $(e.target);

        if ($.inArray($elem.text(), this._selectedTags) === -1) {
            this._selectedTags.push($elem.text());
            $elem.removeClass('btn-primary');
            $elem.addClass('btn-success');
        } else {
            this._selectedTags = $.grep(this._selectedTags, function(val) {
                return val !== $elem.text();
            });
            $elem.removeClass('btn-success');
            $elem.addClass('btn-primary');
        }

        $elem.blur();

        /* eslint no-console: 0 */
        if (debug) {
            console.log(this._selectedTags);
        }

        this._updateGallery();
    },

    _containsStrict: function (needlees, haystack) {
        for (var i = 0; i < needlees.length; i++) {
            if($.inArray(needlees[i], haystack) === -1) {
                return false;
            }
        }
        return true;
    },

    _containsNotStrict: function (needlees, haystack) {
        for (var i = 0; i < needlees.length; i++) {
            if($.inArray(needlees[i], haystack) !== -1) {
                return true;
            }
        }
        return false;
    },

    _containsHardOption: function (needlees, haystack, need) {
        var counter = 0;

        for (var i = 0; i < needlees.length; i++) {
            if($.inArray(needlees[i], haystack) !== -1) {
                counter++;

                if (counter == need) {
                    return true;
                }
            }
        }
        return false;
    },

    _onImage: function (image) {
        $(image).fadeIn();

        if (!$(image).hasClass(this._$galleryImageClassName)) {
            $(image).addClass(this._$galleryImageClassName);
        }
    },

    _offImage: function (image) {
        $(image).fadeOut();
        $(image).removeClass(this._$galleryImageClassName);
    },

    _getImages: function () {
        var _this = this;

        $.ajax({
            url: '/get-images/' + _this._offset,
            type: 'GET'
        })
            .done(function(data) {
                _this._offset *= 2;

                if (data.end == true) {
                    _this._end = true;
                }

                data.images.forEach(function (item) {
                    var $item = $($.parseHTML(item.trim()));
                    $item.hide();
                    _this._$galleryImages.append($item);
                    $item.fadeIn();
                });
            })
            .always(function () {
                _this._$loadGif.hide();
                _this._$galleryImage = $(_this._$galleryImage.selector);

                if (_this._end !== true) {
                    _this._checkBottom(_this._getImages.bind(_this));
                }

                _this._updateGallery();
            });
    },

    _checkBottom: function (callback) {
        var _this = this;

        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
                $(window).unbind('scroll');
                _this._$loadGif.show();
                setTimeout(callback, 500);
            }
        });
    }
};

$(function () {
    Gallery.init(
        {
            id: '#js-gallery',
            mode: 'lg-slide-circular',
            selector: '.gallery-image.js-gallery-image'
        }
    );
});
