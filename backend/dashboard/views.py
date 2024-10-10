from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import VendorSerializer, InventorySerializer, ItemSerializer, OrderSerializer, RequestSerializer, CultureSerializer
from .models import Vendor, Item, Inventory, Order, Request, Culture
from django.db.models import Q
from datetime import datetime


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # Custom action to mark an order as received and update inventory
    # detail = True means this action operates on spacific orders based on the primary key
    @action(detail=True, methods=['post'])
    def received(self, request, pk=None):
        order = self.get_object()  # Get the order by primary key (id)
        # Find or create a corresponding Inventory item based on the catalog number
        inventory_item, created = Inventory.objects.get_or_create(item=order.item)
        if created:
            inventory_item.quantity = order.quantity
            inventory_item.receivedBy = request.user
            inventory_item.receivedDate = datetime.now()
        else:
            # If the item exists in inventory, just update the quantity and the user who received it
            inventory_item.quantity += order.quantity
            inventory_item.receivedBy = request.user
            inventory_item.receivedDate = datetime.now()
        
        inventory_item.save()
        order.delete()  # Optionally delete the order after it's been received
        return Response({'status': 'order received'})

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    # Custom action to convert a request into an order
    @action(detail=True, methods=['post'])
    def ordered(self, request, pk=None):
        rqt = self.get_object()  # Get the request by primary key (id)
        # Create a new Order based on the Request data
        order_instance = Order(
            item=rqt.item,
            vendor=rqt.vendor,
            quantity=rqt.quantity,
            staff=request.user  # The user who submitted the request is marked as the staff
        )
        order_instance.save()
        rqt.delete()  # Optionally delete the request after it has been converted into an order
        return Response({'status': 'request ordered'})

class CultureViewSet(viewsets.ModelViewSet):
    queryset = Culture.objects.all()
    serializer_class = CultureSerializer

    # Custom action for searching cultures
    @action(detail=False)
    def search(self, request):
        query = request.GET.get('q')
        if query:
            # Perform a search across multiple fields based on the query string
            multi_query = Q(Q(organism__icontains=query) | Q(idNumber__icontains=query) | 
                            Q(description__icontains=query) | Q(isolationSource__icontains=query))
            cultures = Culture.objects.filter(multi_query)
        else:
            cultures = Culture.objects.all()  # Return all cultures if no query is provided
        serializer = self.get_serializer(cultures, many=True)
        return Response(serializer.data)