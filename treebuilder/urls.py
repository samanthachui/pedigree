from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'treebuilder'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<person_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^api/$', views.PersonList.as_view()),
    url(r'^api/(?P<pk>[0-9]+)/$$', views.PersonDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)