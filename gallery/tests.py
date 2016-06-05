from django.test import TestCase, Client
from django.utils.crypto import get_random_string

from gallery.models import Image, Tag


class GalleryTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_image_model(self):
        name = get_random_string()
        image = Image.objects.create(name=name, url='image_url')
        self.assertEqual(image.name, name)
        self.assertEqual(image.url, 'image_url')
        self.assertFalse(image.tags.all())

    def test_tag_model(self):
        name = get_random_string()
        tag = Tag.objects.create(name=name)
        self.assertEqual(tag.name, name)

    def test_urls(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
