import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ refreshProducts, selectedProduct, setSelectedProduct }) => {
    const [product, setProduct] = useState({
        nome: '',
        descricao: '',
        codigo: '',
        categoria: '',
        preco: '',
        quantidade_minima: ''
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            clearForm();
        }
    }, [selectedProduct]);

    const clearForm = () => {
        setProduct({
            nome: '',
            descricao: '',
            codigo: '',
            categoria: '',
            preco: '',
            quantidade_minima: ''
        });
        setSelectedProduct(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
        ...product,
        preco: parseFloat(product.preco).toFixed(2),
        quantidade_minima: parseInt(product.quantidade_minima, 10),
    };

    try {
        if (selectedProduct) {
            // Soma a quantidade existente com a nova quantidade
            const produtoExistente = await axios.get(`http://127.0.0.1:8000/api/produtos/${product.id}/`);
            const novaQuantidade = produtoExistente.data.quantidade_minima + productData.quantidade_minima;

            await axios.put(`http://127.0.0.1:8000/api/produtos/${product.id}/`, {
                ...productData,
                quantidade_minima: novaQuantidade, // Atualiza a quantidade somada
            });

            console.log("Produto atualizado com sucesso.");
        } else {
            await axios.post('http://127.0.0.1:8000/api/produtos/', productData);
            console.log("Produto adicionado com sucesso.");
        }

        await refreshProducts();
        clearForm();
    } catch (error) {
        console.error("Erro ao atualizar ou adicionar produto:", error.response ? error.response.data : error);
        alert("Erro: " + (error.response ? error.response.data.error : "Erro desconhecido."));
    }
};

    return (
        <form onSubmit={handleSubmit}>
            <input name="nome" value={product.nome} onChange={handleChange} placeholder="Nome" required />
            <input name="descricao" value={product.descricao} onChange={handleChange} placeholder="Descrição" required />
            <input name="codigo" value={product.codigo} onChange={handleChange} placeholder="Código" required />
            <input name="categoria" value={product.categoria} onChange={handleChange} placeholder="Categoria" required />
            <input type="number" name="preco" value={product.preco} onChange={handleChange} placeholder="Preço" required />
            <input type="number" name="quantidade_minima" value={product.quantidade_minima} onChange={handleChange} placeholder="Quantidade" required />
            
            <button type="submit">{selectedProduct ? "Atualizar" : "Adicionar"}</button>
            {selectedProduct && <button type="button" onClick={clearForm}>Cancelar</button>}
        </form>
    );
};

export default ProductForm;
