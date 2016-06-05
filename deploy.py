import os

os.system('npm run build')
os.system('python manage.py makemigrations thumbnail')
os.system('python manage.py migrate')
os.system('python init_db.py')
