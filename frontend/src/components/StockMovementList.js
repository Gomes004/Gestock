import React from 'react';

const StockMovementList = ({ movements, onEdit }) => {
    return (
        <div>
            {movements.map((movement) => (
                <div key={movement.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3 style={{ margin: 0 }}>Produto: {movement.produto_nome || 'Nome não disponível'}</h3>
                    <p>Tipo de Movimentação: {movement.tipo_movimentacao}</p>
                    <p>Quantidade: {movement.quantidade}</p>
                    <p>Motivo: {movement.motivo}</p>
                    <p>Data: {new Date(movement.data).toLocaleDateString()}</p>
                    <button onClick={() => onEdit(movement)}>Editar</button> {/* Botão de edição */}
                </div>
            ))}
        </div>
    );
};

export default StockMovementList;
