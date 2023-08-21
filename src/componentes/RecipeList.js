import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Recipe from './componentes/Recipe';

const RecipeList = () => {
  const APP_ID = '5b388d4a';
  const APP_KEY = '949067325ba26950ecf72a4685a6ec05';
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default RecipeList;
