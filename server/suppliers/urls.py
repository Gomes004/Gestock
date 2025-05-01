from django.urls import path
from .views import (
    SupplierListCreateView,
    SupplierRetrieveView,
    ReplenishmentOrderListCreateView,
    ReplenishmentOrderRetrieveView,
)

urlpatterns = [
    path("suppliers/", SupplierListCreateView.as_view(), name="supplier-list-create"),
    path(
        "suppliers/<int:supplier_id>/",
        SupplierRetrieveView.as_view(),
        name="supplier-detail",
    ),
    path(
        "replenishments/",
        ReplenishmentOrderListCreateView.as_view(),
        name="replenishment-list-create",
    ),
    path(
        "replenishments/<int:order_id>/",
        ReplenishmentOrderRetrieveView.as_view(),
        name="replenishment-detail",
    ),
]
