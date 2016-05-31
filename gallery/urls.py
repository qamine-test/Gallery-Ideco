from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from gallery.views import gallery_page


urlpatterns = [
    url(r'^$', gallery_page),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
