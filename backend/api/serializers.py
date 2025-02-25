from rest_framework import serializers
from .models import Produto, Fornecedor, Pedido, MovimentacaoEstoque

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

    def validate_codigo(self, value):
        # Se estamos atualizando um produto, verifique a unicidade apenas se o código foi alterado
        if self.instance and Produto.objects.filter(codigo=value).exclude(id=self.instance.id).exists():
            raise serializers.ValidationError("O código deve ser único.")
        return value    

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'


class MovimentacaoEstoqueSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)    
    
    class Meta:
        model = MovimentacaoEstoque
        fields = '__all__'
