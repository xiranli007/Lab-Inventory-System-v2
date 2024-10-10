from django.contrib import admin
from .models import Vendor, Item, Inventory, Order, Request, Culture

class VendorAdmin(admin.ModelAdmin):
    list_display= ['name']
class ItemAdmin(admin.ModelAdmin):
    list_display= ['name','catalogNumber']
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['item', 'quantity','receivedBy']
class OrderAdmin(admin.ModelAdmin):
    list_display = ['item', 'quantity', 'staff','orderedDate']
class RequestAdmin(admin.ModelAdmin):
    list_display= ['item', 'quantity','personRequest']
class CultureAdmin(admin.ModelAdmin):
    list_display= ['organism', 'idNumber', 'description', 'isolationSource']

admin.site.register(Vendor, VendorAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(Culture, CultureAdmin)