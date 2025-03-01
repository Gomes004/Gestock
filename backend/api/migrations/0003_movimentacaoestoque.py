# Generated by Django 5.1.6 on 2025-02-23 01:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_fornecedor_contato_alter_fornecedor_nome_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MovimentacaoEstoque',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_movimentacao', models.CharField(choices=[('entrada', 'Entrada'), ('saida', 'Saída')], max_length=10)),
                ('quantidade', models.IntegerField()),
                ('motivo', models.TextField(blank=True, null=True)),
                ('data', models.DateTimeField(auto_now_add=True)),
                ('produto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.produto')),
            ],
        ),
    ]
