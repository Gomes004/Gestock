import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Produto: {product.nome}</h3> 
                    <p>Descrição: {product.descricao}</p>
                    <p>Código: {product.codigo}</p>
                    <p>Categoria: {product.categoria}</p>
                    <p>Preço: R$ {parseFloat(product.preco).toFixed(2)}</p>
                    <p>Quantidade: {product.quantidade_minima ?? 'Não definida'}</p>
                    <button onClick={() => onEdit(product)}>Editar</button>
                    <button onClick={() => onDelete(product.id)}>Excluir</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;


