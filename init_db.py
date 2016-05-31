import os

import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'GalleryIdeco.settings')
django.setup()


def create_users():
    print('Create users...')
    get_user_model().objects.create_superuser(
        'Savi', 'Savi@hackerdom.ru', 'qwer'
    )


def create_images():
    pass


if __name__ == '__main__':
    create_users()
