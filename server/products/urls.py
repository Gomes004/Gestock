from django.urls import path
from .views import (
    ProductListCreateView,
    ProductRetrieveView,
    StockMovementListCreateView,
    StockReportPDFView,
)

app_name = "products"

urlpatterns = [
    path("products/", ProductListCreateView.as_view(), name="product-list-create"),
    path(
        "products/<int:product_id>/",
        ProductRetrieveView.as_view(),
        name="product-retrieve-update-destroy",
    ),
    path(
        "stock-movements/",
        StockMovementListCreateView.as_view(),
        name="stock-movement-list-create",
    ),
    path("stock-report/pdf/", StockReportPDFView.as_view(), name="stock-report-pdf"),
]
