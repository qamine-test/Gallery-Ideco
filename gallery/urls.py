from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from gallery.views import gallery_page, get_images

urlpatterns = [
    url(r'^$', gallery_page),
    url(r'^get-images/(?P<offset>\d+)/$', get_images)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
