from django.contrib import admin
from django.urls import path, include
from dashboard import views as dviews
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'vendors', dviews.VendorViewSet)       
router.register(r'items', dviews.ItemViewSet)           
router.register(r'inventory', dviews.InventoryViewSet)  
router.register(r'orders', dviews.OrderViewSet)        
router.register(r'requests', dviews.RequestViewSet)     
router.register(r'cultures', dviews.CultureViewSet)    
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/dashboard/', include(router.urls)),
    # path('api/dashboard/', include('dashboard.urls')),  # Separate dashboard API
    path('api/user/', include('user.urls')),  # Separate user API
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT Token endpoints
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

