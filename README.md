
# Gestock
Sistema SaaS (Software as a Service) de Gerenciamento de Estoque

# 📦 Histórias de Usuário para o Sistema SaaS de Gerenciamento de Estoque

## 1️⃣ Cadastro e gestão de produtos
**Como** 🏬 gerente de estoque,  
**Quero** cadastrar, editar e excluir produtos no sistema,  
**Para que** eu possa manter um inventário atualizado e organizado.  

### ✅ Critérios de aceitação:
- O sistema deve permitir o cadastro de novos produtos com nome, descrição, código, categoria e preço.
- Deve ser possível atualizar e excluir produtos cadastrados.
- Deve existir um campo para definir a quantidade mínima de estoque para alertas.

## 2️⃣ Controle de entrada e saída de estoque
**Como** 📊 operador de estoque,  
**Quero** registrar a entrada e saída de produtos no estoque,  
**Para que** eu possa monitorar e controlar os níveis de estoque com precisão.  

### ✅ Critérios de aceitação:
- Deve ser possível adicionar entradas e saídas de produtos especificando quantidade e motivo.
- O sistema deve atualizar automaticamente a quantidade de estoque ao registrar uma movimentação.
- O sistema deve alertar quando um produto atingir o estoque mínimo.

## 3️⃣ Gerenciamento de fornecedores e pedidos
**Como** 🏢 administrador do sistema,  
**Quero** cadastrar e gerenciar fornecedores e pedidos de reposição,  
**Para que** eu possa otimizar o processo de aquisição de produtos e evitar rupturas de estoque.  

### ✅ Critérios de aceitação:
- Deve ser possível cadastrar fornecedores com informações de contato e produtos fornecidos.
- Deve ser possível criar e acompanhar pedidos de reposição de estoque.
- O sistema deve permitir o registro do status dos pedidos (pendente, enviado, recebido, cancelado).

## 4️⃣ Relatórios e dashboards
**Como** 📈 gestor,  
**Quero** visualizar relatórios e dashboards sobre movimentações de estoque,  
**Para que** eu possa tomar decisões baseadas em dados e melhorar a gestão de inventário.  

### ✅ Critérios de aceitação:
- Deve ser possível gerar relatórios de entrada, saída e produtos com baixo estoque.
- O sistema deve fornecer um dashboard interativo com gráficos sobre movimentação e níveis de estoque.
- Deve ser possível exportar relatórios em formatos como PDF e Excel.

## 5️⃣ Autenticação de usuários
**Como** 🔐 usuário do sistema,  
**Quero** fazer login e acessar apenas as funcionalidades permitidas pelo meu perfil,  
**Para que** eu possa usar o sistema de forma segura e conforme minha função.  

### ✅ Critérios de aceitação:
- O sistema deve oferecer login e senha para cada usuário.
- Deve existir diferentes níveis de permissão (ex: operador, gestor, administrador).
- O sistema deve permitir a recuperação de senha por e-mail.
