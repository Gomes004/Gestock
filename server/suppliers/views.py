from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Supplier, ReplenishmentOrder
from .serializers import SupplierSerializer, ReplenishmentOrderSerializer
from users.permissions import IsAdminOrManagerOrOperator


class SupplierListCreateView(ListCreateAPIView):
    serializer_class = SupplierSerializer
    queryset = Supplier.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrManagerOrOperator()]
        return [IsAuthenticated()]


class SupplierRetrieveView(RetrieveUpdateDestroyAPIView):
    serializer_class = SupplierSerializer
    queryset = Supplier.objects.all()
    lookup_url_kwarg = "supplier_id"

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH"]:
            return [IsAdminOrManagerOrOperator()]
        elif self.request.method == "DELETE":
            return [IsAdminUser()]
        return [IsAuthenticated()]


class ReplenishmentOrderListCreateView(ListCreateAPIView):
    serializer_class = ReplenishmentOrderSerializer
    queryset = ReplenishmentOrder.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrManagerOrOperator()]
        return [IsAuthenticated()]


class ReplenishmentOrderRetrieveView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReplenishmentOrderSerializer
    queryset = ReplenishmentOrder.objects.all()
    lookup_url_kwarg = "order_id"

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH"]:
            return [IsAdminOrManagerOrOperator()]
        elif self.request.method == "DELETE":
            return [IsAdminUser()]
        return [IsAuthenticated()]
