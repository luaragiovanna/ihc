import React from 'react';
import { Link } from 'react-router-dom';
import AddRecipeForm from './AddRecipeForm';
import './AddRecipePage.css';

const AddRecipePage = ({ onAddRecipe }) => {
  const addNewRecipe = newRecipe => {
    // Call the onAddRecipe function to add the new recipe
    onAddRecipe(newRecipe);
  };

  return (
    <div className="add-recipe-page">
      <h2 className="add-recipe-title">Adicione sua receita!</h2>
      {/* Passar a função de adicionar para o componente de formulário */}
      <AddRecipeForm onAddRecipe={addNewRecipe} />
      <Link to="/" className="back-link">Voltar para a Lista de Receitas</Link>
    </div>
  );
};

export default AddRecipePage;
