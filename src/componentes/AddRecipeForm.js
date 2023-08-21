import React, { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newRecipe = {
      title,
      calories,
      image,
      ingredients: ingredients.split(',').map(ingredient => ({ text: ingredient.trim() })),
    };
    onAddRecipe(newRecipe);
    // Limpar os campos após adicionar a receita
    setTitle('');
    setCalories('');
    setImage('');
    setIngredients('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Calorias"
        value={calories}
        onChange={e => setCalories(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={image}
        onChange={e => setImage(e.target.value)}
        required
      />
      <textarea
        placeholder="Ingredientes (separados por vírgula)"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        required
      />
      <button type="submit">Adicionar Receita</button>
    </form>
  );
};

export default AddRecipeForm;
