from django.conf.urls import url

from . import views

app_name = 'treebuilder'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<person_id>[0-9]+)/$', views.detail, name='detail'),
]