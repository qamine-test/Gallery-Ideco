from django.test import TestCase, Client
from gallery.models import Image


class GalleryTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_model(self):
        image = Image.objects.create(url='image_url', tags='#image')
        self.assertEqual(image.url, 'image_url')
        self.assertEqual(image.tags, '#image')

    def test_urls(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
