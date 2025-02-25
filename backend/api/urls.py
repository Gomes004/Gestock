# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet, FornecedorViewSet, PedidoViewSet, MovimentacaoEstoqueViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'fornecedores', FornecedorViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'movimentacoes', MovimentacaoEstoqueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]