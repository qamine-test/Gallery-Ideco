from django.contrib import admin

from gallery.models import Image


@admin.register(Image)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['tags']

    def img(self):  # Для картинки в админке на будущее
        pass
