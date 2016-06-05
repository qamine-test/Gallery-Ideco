from django.http import JsonResponse
from django.shortcuts import render
from django.template import Template, Context

from gallery.models import Image, Tag


TEMPLATE_IMAGE = """
                 {% load static %}
                 {% load thumbnail %}
                 <div data-src="/media/{{ image.url }}" class="gallery-image js-gallery-image">
                     {% thumbnail image.url "250x150" crop="center" as thumb %}
                         <img src="{{ thumb.url }}" class="img-responsive img-thumbnail">
                     {% empty %}
                         <img src="{% static 'images/no_preview.png' %}" class="img-responsive img-thumbnail">
                     {% endthumbnail %}
                     <div class="gallery-tags js-gallery-tags">
                         {% for tag in image.tags.all %}
                             <button type="button" class="btn btn-primary gallery-tag js-gallery-tag">{{ tag }}</button>
                         {% endfor %}
                     </div>
                 </div>
                 """  # NOQA


def gallery_page(request):
    images = Image.objects.all()[0:8]
    tags = [el for el in Tag.objects.all()]

    return render(request, 'gallery.html', {'images': images, 'tags': tags})


def get_images(request, offset):  # NOQA
    offset = int(offset)
    images = Image.objects.all()

    end_flag = offset * 2 >= len(images)

    template = Template(TEMPLATE_IMAGE)

    html_images = []

    for image in images[offset:offset * 2]:
        html_images.append(template.render(Context({'image': image})))

    return JsonResponse({'images': html_images, 'end': end_flag})
