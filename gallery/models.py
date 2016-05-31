from django.db import models


class Image(models.Model):
    url = models.ImageField(verbose_name='image', upload_to='images')
    tags = models.CharField(verbose_name='tags', max_length=128)

    class Meta:
        verbose_name = 'image'
        verbose_name_plural = 'images'
