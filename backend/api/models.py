from django.db import models
from django.core.exceptions import ValidationError

class Produto(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Produto")
    descricao = models.TextField(verbose_name="Descrição do Produto")
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código do Produto",
                              error_messages={
                                  'unique': "Já existe um produto com este código.",
                                  'blank': "O código não pode estar em branco."
                              })
    categoria = models.CharField(max_length=50, verbose_name="Categoria do Produto")
    preco = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Preço do Produto",
                                 error_messages={
                                     'invalid': "O preço deve ser um número decimal válido."
                                 })
    quantidade_minima = models.IntegerField(default=0, verbose_name="Quantidade Mínima")

    def __str__(self):
        return self.nome

    def clean(self):
        # Adicionando validações adicionais se necessário
        if self.quantidade_minima < 0:
            raise ValidationError("A quantidade mínima não pode ser negativa.")


class Fornecedor(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Fornecedor")
    contato = models.CharField(max_length=100, verbose_name="Contato do Fornecedor")

    def __str__(self):
        return self.nome


class Pedido(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE, verbose_name="Produto")
    quantidade = models.IntegerField(verbose_name="Quantidade do Pedido")
    STATUS_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Enviado', 'Enviado'),
        ('Recebido', 'Recebido'),
        ('Cancelado', 'Cancelado')
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, verbose_name="Status do Pedido")

    def __str__(self):
        return f'{self.quantidade} de {self.produto.nome}'
    
class MovimentacaoEstoque(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    tipo_movimentacao = models.CharField(max_length=10, choices=[('entrada', 'Entrada'), ('saida', 'Saída')])
    quantidade = models.IntegerField()
    motivo = models.TextField(blank=True, null=True)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        motivo_display = self.motivo if self.motivo else 'Sem motivo'
        return f"Produto: {self.produto.nome} - Tipo: {self.tipo_movimentacao} - Quantidade: {self.quantidade} - Motivo: {motivo_display}"
