from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Produto, Fornecedor, Pedido, MovimentacaoEstoque
from .serializers import ProdutoSerializer, FornecedorSerializer, PedidoSerializer, MovimentacaoEstoqueSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

    def update(self, request, *args, **kwargs):
        print("Dados recebidos para atualização:", request.data)  # Para depuração
        produto = self.get_object()

        # Verificar se o código foi alterado
        novo_codigo = request.data.get('codigo', produto.codigo)

        # Se o código foi alterado, verificar a unicidade
        if novo_codigo != produto.codigo:
            if Produto.objects.filter(codigo=novo_codigo).exists():
                return Response({"error": "Já existe um produto com este código."}, status=status.HTTP_400_BAD_REQUEST)

        # Atualiza o produto com os dados que foram enviados
        serializer = self.get_serializer(produto, data=request.data, partial=True)

        # Verifique se os dados são válidos e imprima os erros, se houver
        if not serializer.is_valid():
            print("Erros de validação:", serializer.errors)  # Para depuração
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)

        return Response(serializer.data)

    def get_queryset(self):
        queryset = super().get_queryset()
        codigo = self.request.query_params.get('codigo', None)
        if codigo is not None:
            queryset = queryset.filter(codigo=codigo)
        return queryset

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class MovimentacaoEstoqueViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoEstoque.objects.all()
    serializer_class = MovimentacaoEstoqueSerializer
