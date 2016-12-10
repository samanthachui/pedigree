from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
	class Meta:
		model = Person
		fields = ('id', 'first_name', 'middle_name', 'last_name', 'gender', 'date_of_birth', 'date_of_death', 'father', 'mother', 'age', 'full_name', 'father_name', 'mother_name')

	def create(self, validated_data):
		#user = self.context.get("user")
		first_name = validated_data.get('first_name', None)
		middle_name = validated_data.get('middle_name', None)
		last_name = validated_data.get('last_name', None)
		gender = validated_data.get('gender', None)
		date_of_birth = validated_data.get('date_of_birth', None)
		date_of_death = validated_data.get('date_of_death', None)
		father = validated_data.get('father', None)
		mother = validated_data.get('mother', None)

		return Person.objects.create(first_name=first_name, middle_name=middle_name, last_name=last_name, gender=gender, date_of_birth=date_of_death, date_of_death=date_of_death, father=father, mother=mother)