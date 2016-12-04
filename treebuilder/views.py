from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render

from .models import Person

# Create your views here.
def index(request):
	#return HttpResponse("Hello, world. You're at the treebuilder index.")
	latest_person_list = Person.objects.order_by('-date_of_birth')[:10]
	context = {
		'latest_person_list': latest_person_list,
	}
	return render(request, 'treebuilder/index.html', context)

def detail(request, person_id):
	#return HttpResponse("You're looking at person %s." % person_id)
	try:
		person = Person.objects.get(pk=person_id)
	except Person.DoesNotExist:
		raise Http404("Person does not exist")
	return render(request, 'treebuilder/detail.html', {'person':person})
