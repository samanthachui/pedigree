from django.db import models
from datetime import date

# Create your models here.
class Person(models.Model):
	first_name = models.CharField(max_length=50)
	middle_name = models.CharField(max_length=50, null=True, blank=True)
	last_name = models.CharField(max_length=50)
	gender = models.CharField(max_length=1)
	date_of_birth = models.DateField()
	date_of_death = models.DateField(null=True, blank=True)
	father = models.ForeignKey('self', null=True, blank=True, related_name='%(class)s_father')
	mother = models.ForeignKey('self', null=True, blank=True, related_name='%(class)s_mother')

	def __str__(self):
		return "%s, %s" % (self.last_name, self.first_name)

	def full_name(self):
		return "%s %s" % (self.first_name, self.last_name)

	def is_deceased(self):
		return self.date_of_death is not None

	def age(self):
		if self.is_deceased():
			today = self.date_of_death
		else:
			today = date.today()
		years_difference = today.year - self.date_of_birth.year
		is_before_birthday = (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
		elapsed_years = years_difference - int(is_before_birthday)
		return elapsed_years

	def parents(self):
		return [self.father, self.mother]

	def children(self, spouse=None):
		children = []
		for c in Person.objects.all():
			if spouse == None:
				if self in c.parents():
					children.append(c)
			else:
				if self in c.parents() and spouse in c.parents():
					children.append(c)
		return children

	def marriages(self):
		marriages = []
		for m in Marriage.objects.all():
			if self in m.spouses():
				marriages.append(m)
		return marriages

	def spouses(self):
		spouses = []
		marriages = self.marriages()
		for m in marriages:
			spouses.append(m.spouse(self))
		return spouses

class Marriage(models.Model):
	spouse1 = models.ForeignKey('Person', related_name='%(class)s_spouse1')
	spouse2 = models.ForeignKey('Person', related_name='%(class)s_spouse2')
	date_of_marriage = models.DateField(null=True, blank=True)
	date_of_divorce = models.DateField(null=True, blank=True)

	def __str__(self):
		return "%s / %s" % (self.spouse1, self.spouse2)

	def spouses(self):
		return [self.spouse1, self.spouse2]

	def spouse(self, person):
		if self.spouse1.id == person.id:
			return self.spouse2
		elif self.spouse2.id == person.id:
			return self.spouse1
		else:
			return None