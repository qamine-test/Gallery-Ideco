from django.contrib import admin

from gallery.models import Image, Tag


@admin.register(Image)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['name', 'get_tags', 'image_tag']
    fields = ['name', 'tags', 'url', 'image_tag']
    readonly_fields = ['image_tag']


@admin.register(Tag)
class GalleryTag(admin.ModelAdmin):
    list_display = ['name']
