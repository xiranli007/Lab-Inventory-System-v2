from rest_framework import serializers
from .models import Vendor, Item, Inventory, Order, Request, Culture

class VendorSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Vendor
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Item
        fields = "__all__"
class InventorySerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    received_by_first_name = serializers.CharField(source='receivedBy.first_name', read_only=True)
    class Meta: 
        model = Inventory
        fields = ['id', 'item_name', 'quantity', 'received_by_first_name', 'storage', 'receivedDate'] 
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Order
        fields = "__all__"

class RequestSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Request
        fields = "__all__"
class CultureSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Culture
        fields = "__all__"