import os
import random
import shutil

import django
from django.contrib.auth import get_user_model

from GalleryIdeco.settings import BASE_DIR

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'GalleryIdeco.settings')
django.setup()

from gallery.models import Image, Tag

TAGS = ['#nice', '#ideco', '#star_wars', '#закат', '#волк', '#мур']


def create_users():
    print('Create users...')

    get_user_model().objects.create_superuser(
        'Savi', 'Savi@hackerdom.ru', 'qwer'
    )


def create_tags():
    print('Create tags...')

    for tag in TAGS:
        Tag.objects.create(name=tag)


def create_images():
    print('Create images...')

    counter = 1
    tags = Tag.objects.all()

    shutil.copytree(
        os.path.join(BASE_DIR, 'db_images'),
        os.path.join(BASE_DIR, 'media/images')
    )

    for file in os.listdir(os.path.join(BASE_DIR, 'db_images')):
        new_image = Image.objects.create(
            name=counter,
            url=os.path.join('images', file)
        )

        for i in range(4):  # NOQA
            new_image.tags.add(random.choice(tags))

        counter += 1

if __name__ == '__main__':
    create_users()
    create_tags()
    create_images()
