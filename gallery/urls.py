from django.conf.urls import url

from gallery.views import gallery_page, get_images

urlpatterns = [
    url(r'^$', gallery_page),
    url(r'^get-images/(?P<offset>\d+)/$', get_images)
]
