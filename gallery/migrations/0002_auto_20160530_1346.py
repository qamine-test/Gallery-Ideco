# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 13:46
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='image',
            new_name='url',
        ),
    ]
