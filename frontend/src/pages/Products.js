import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import StockMovementForm from '../components/StockMovementForm';
import StockMovementList from '../components/StockMovementList'; 
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]); // Estado para produtos
    const [movements, setMovements] = useState([]); // Estado para movimentações
    const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
    const [selectedMovement, setSelectedMovement] = useState(null); // Movimentação selecionada
    const [isEditingMovement, setIsEditingMovement] = useState(false); // Controle de edição
    const [currentMovementId, setCurrentMovementId] = useState(null); // ID da movimentação atual

    // Função para buscar produtos da API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/produtos/');
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    // Função para buscar movimentações da API
    const fetchMovements = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/movimentacoes/');
            setMovements(response.data);
        } catch (error) {
            console.error("Erro ao buscar movimentações:", error);
        }
    };

    // Função para atualizar a quantidade do produto
    const updateProductQuantity = async (productId, tipoMovimentacao, quantidade) => {
        try {
            // Encontra o produto na lista de produtos
            const produto = products.find(p => p.id === productId);
            if (!produto) {
                console.error("Produto não encontrado");
                return;
            }
    
            // Calcula a nova quantidade
            const novaQuantidade = tipoMovimentacao === 'entrada'
                ? produto.quantidade_minima + quantidade
                : produto.quantidade_minima - quantidade;
    
            // Verifica se a nova quantidade é válida
            if (novaQuantidade < 0) {
                console.error("Quantidade não pode ser negativa");
                return;
            }
    
            // Atualiza a quantidade do produto na API
            await axios.put(`http://127.0.0.1:8000/api/produtos/${productId}/`, {
                ...produto, // Mantém os outros campos do produto
                quantidade_minima: novaQuantidade // Atualiza a quantidade
            });
    
            // Atualiza o estado local (products)
            setProducts(prevProducts => prevProducts.map(p => 
                p.id === productId ? { ...p, quantidade_minima: novaQuantidade } : p
            ));
    
            console.log("Quantidade do produto atualizada com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar quantidade do produto:", error);
        }
    };
    // Função para deletar um produto
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/produtos/${productId}/`);
            fetchProducts(); // Atualiza a lista de produtos
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    // Função para editar uma movimentação
    const handleEditMovement = (movement) => {
        setSelectedMovement(movement); // Atualiza a movimentação selecionada
        setIsEditingMovement(true); // Habilita o modo de edição
        setCurrentMovementId(movement.id); // Define o ID da movimentação atual
    };

    // Função para limpar o formulário de movimentação
    const clearMovementForm = () => {
        setSelectedMovement(null); // Limpa a movimentação selecionada
        setIsEditingMovement(false); // Desabilita o modo de edição
        setCurrentMovementId(null); // Limpa o ID da movimentação atual
    };

    // Efeito para buscar produtos e movimentações ao carregar o componente
    useEffect(() => {
        fetchProducts();
        fetchMovements();
    }, []);

    return (
        <div>
            <h2>Gerenciar Produtos</h2>
            <ProductForm 
                refreshProducts={fetchProducts} 
                selectedProduct={selectedProduct} 
                setSelectedProduct={setSelectedProduct} 
            />
            <ProductList 
                products={products} 
                onEdit={setSelectedProduct} 
                onDelete={handleDelete} 
            />
            <h2>Movimentação de Estoque</h2>
            <StockMovementForm 
                refreshMovements={fetchMovements}
                setSelectedMovement={setSelectedMovement}
                selectedMovement={selectedMovement}
                isEditing={isEditingMovement}
                currentMovementId={currentMovementId}
                products={products}
                clearMovementForm={clearMovementForm}
                updateProductQuantity={updateProductQuantity} // Passando a função
            />
            <StockMovementList 
                movements={movements} 
                onEdit={handleEditMovement} 
            />
        </div>
    );
};

export default Products;
