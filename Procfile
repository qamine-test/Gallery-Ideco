web: gunicorn GalleryIdeco.wsgi --log-file -
worker: npm run build && python manage.py makemigrations thumbnail && python manage.py migrate && python init_db.py
