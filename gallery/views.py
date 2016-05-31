from django.shortcuts import render

from gallery.models import Image


def gallery_page(request):
    images = Image.objects.all()
    return render(request, 'gallery.html', {'images': images})
