# Packages
Django==5.1.1
python-dotenv==1.0.1
djangorestframework==3.15.2
pytest==8.3.3
pytest-django==4.9.0
black==24.8.0 
flake8==7.1.1
django-cors-headers==4.4.0
axios==0.4.0

# To generate a secret key, we can use a django function
from django.core.management.utils import get_random_secret_key

print(get_random_secret_key())