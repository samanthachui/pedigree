from django.contrib import admin

# Register your models here.
from .models import Person, Marriage

admin.site.register(Person)
admin.site.register(Marriage)