#!/usr/bin/env bash

npm run build
python manage.py makemigrations thumbnail
python manage.py migrate
python init_db.py
