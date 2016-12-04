from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render

#from rest_framework.decorator import permission_classes
#from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import PersonSerializer

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
	return render(request, 'treebuilder/detail.html', {'person':person, 'person_id':person_id})

class PersonList(generics.ListCreateAPIView):
	queryset = Person.objects.all()
	serializer_class = PersonSerializer

	def get(self, request, format=None):
		person = Person.objects.all().order_by('-date_of_birth')
		serializer = PersonSerializer(person, many=True)
		return Response(serializer.data)

	#@permission_classes((IsAdminUser, ))
	def post(self, request, format=None):
		user = request.user
		serializer = PersonSerializer(data=request.data, context={'user':user})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Person.objects.all()
	serializer_class = PersonSerializer