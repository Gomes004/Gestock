import React, { useEffect } from 'react';
import axios from 'axios';

const StockMovementForm = ({
    refreshMovements,
    setSelectedMovement,
    selectedMovement,
    isEditing,
    currentMovementId,
    products,
    clearMovementForm,
    updateProductQuantity
}) => {
    const [movement, setMovement] = React.useState({
        produto: '',
        tipo_movimentacao: 'entrada',
        quantidade: '',
        motivo: ''
    });

    useEffect(() => {
        if (selectedMovement) {
            setMovement(selectedMovement);
        } else {
            clearForm();
        }
    }, [selectedMovement]);

    const clearForm = () => {
        setMovement({
            produto: '',
            tipo_movimentacao: 'entrada',
            quantidade: '',
            motivo: ''
        });
        setSelectedMovement(null);
        clearMovementForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovement({ ...movement, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const movementData = {
            ...movement,
            quantidade: parseInt(movement.quantidade, 10)
        };
    
        try {
            if (isEditing) {
                // Atualiza a movimentação existente
                await axios.put(`http://127.0.0.1:8000/api/movimentacoes/${currentMovementId}/`, movementData);
                console.log("Movimentação atualizada com sucesso.");
            } else {
                // Adiciona uma nova movimentação
                await axios.post('http://127.0.0.1:8000/api/movimentacoes/', movementData);
                console.log("Movimentação adicionada com sucesso.");
            }
    
            // Depuração: Verifique os valores de `movement`
            console.log("Atualizando quantidade do produto:", {
                productId: movement.produto,
                tipoMovimentacao: movement.tipo_movimentacao,
                quantidade: movement.quantidade
            });
    
            // Atualiza a quantidade do produto
            await updateProductQuantity(movement.produto, movement.tipo_movimentacao, movement.quantidade);
    
            // Atualiza a lista de movimentações
            await refreshMovements();
            clearForm();
        } catch (error) {
            console.error("Erro ao atualizar ou adicionar movimentação:", error.response ? error.response.data : error);
            alert("Erro: " + (error.response ? error.response.data.error : "Erro desconhecido."));
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <select name="produto" value={movement.produto} onChange={handleChange} required>
                <option value="">Selecione um produto</option>
                {products.map(product => (
                    <option key={product.id} value={product.id}>
                        {product.nome}
                    </option>
                ))}
            </select>
            <select name="tipo_movimentacao" value={movement.tipo_movimentacao} onChange={handleChange} required>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>
            <input
                type="number"
                name="quantidade"
                value={movement.quantidade}
                onChange={handleChange}
                placeholder="Quantidade"
                required
            />
            <input
                type="text"
                name="motivo"
                value={movement.motivo}
                onChange={handleChange}
                placeholder="Motivo (opcional)"
            />
            <button type="submit">{isEditing ? "Atualizar Movimentação" : "Adicionar Movimentação"}</button>
            {isEditing && <button type="button" onClick={clearForm}>Cancelar</button>}
        </form>
    );
};

export default StockMovementForm;
