from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model() 

class Vendor(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return f'{self.name}'

class Item(models.Model):
    name = models.CharField(max_length=300)
    catalogNumber = models.CharField(max_length=50)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    link = models.URLField(max_length=200, null=True)

    def __str__(self):
        return f'{self.name} ({self.catalogNumber})'

class Inventory(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(null=True)
    receivedBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    storage = models.TextField(null=True)
    receivedDate = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f'{self.item.name}'


class Order(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    staff = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    quantity = models.PositiveBigIntegerField(null=True)
    orderedDate = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f'{self.item.name}'

class Request(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(null=True)
    personRequest = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.item.name}'

    
class Culture(models.Model):
    boxNumber = models.CharField(max_length=30, null = True,blank = False)
    organism = models.CharField(max_length=100, null=True,blank = False)
    idNumber = models.CharField(max_length=100, null = True,blank = True)
    copySaved = models.PositiveBigIntegerField(null=True,blank = False)
    description = models.CharField(max_length=200, null = True,blank = False)
    isolationSource = models.CharField(max_length=300,null=True,blank = True)
    alternateDesignation = models.CharField(max_length=300, null=True,blank = True)
    receivedFrom = models.CharField(max_length=300, null=True,blank = False)
    ReceivedDate = models.DateField(null=True,blank = False)
    originallyReceivedFrom = models.CharField(max_length=300, null=True, blank = True)
    additionalInfo = models.TextField(null=True,blank = True)

    def __str__(self):
        return f'{self.organism}'
    



