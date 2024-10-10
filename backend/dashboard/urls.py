from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'vendors', views.VendorViewSet)       
router.register(r'items', views.ItemViewSet)           
#router.register(r'inventory', views.InventoryViewSet)  
router.register(r'orders', views.OrderViewSet)        
router.register(r'requests', views.RequestViewSet)     
router.register(r'cultures', views.CultureViewSet)     

urlpatterns = [
    path('dashboard/', include(router.urls)),
]



