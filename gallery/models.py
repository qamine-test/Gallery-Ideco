from django.db import models


class Tag(models.Model):
    name = models.CharField(verbose_name='name', max_length=32)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = 'tag'
        verbose_name_plural = 'tags'


class Image(models.Model):
    name = models.CharField(verbose_name='name', max_length=64)
    url = models.ImageField(verbose_name='image', upload_to='images')
    tags = models.ManyToManyField(Tag, related_name='tags')

    def __str__(self):
        return '%s' % self.name

    def image_tag(self):
        return '<img src="%s" width=200 />' % self.url.url

    image_tag.short_description = 'Preview'
    image_tag.allow_tags = True

    def get_tags(self):
        return ' '.join([tag.name for tag in self.tags.all()])

    class Meta:
        verbose_name = 'image'
        verbose_name_plural = 'images'
