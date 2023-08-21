import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddRecipePage from './componentes/AddRecipePage';
import Recipe from './componentes/Recipe';

const APP_ID = '5b388d4a';
const APP_KEY = '949067325ba26950ecf72a4685a6ec05';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.title}
          title={recipe.title}
          calories={recipe.calories}
          image={recipe.image}
          ingredients={recipe.ingredients}
        />
      ))}
    </div>
  );
};

const Home = ({ handleSearch, searchValue }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [searchValue]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const formattedRecipes = response.data.hits.map(hit => ({
        title: hit.recipe.label,
        calories: hit.recipe.calories,
        image: hit.recipe.image,
        ingredients: hit.recipe.ingredients,
      }));
      setRecipes(formattedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="App">
      <div className="background">
      
        <div className="image-container">
          <img src={require('./assets/img2.png')} alt="Imagem" />
        </div>
      </div>
     
      <div className="content-container">
        <div className="welcome-section">
          <h1 className="dark-blue-text">Bem-vindo!</h1>
          <header>
        <Link to="/add" className="add-button">
          +
        </Link>
      </header>
          <p className="large-blue-text">
            Procurando por alguma receita? Digite na barra de pesquisa aqui em cima.
          </p>
        </div>
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <input
            className="search-bar"
            type="text"
            value={searchValue}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Buscar receita..."
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
  
  
  };

  const App = () => {
    const [query, setQuery] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = value => {
      setSearchValue(value);
      setQuery(value);
    };

    const handleAddRecipe = newRecipe => {
      console.log('Adding new recipe:', newRecipe);
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
    };
    

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home handleSearch={handleSearch} searchValue={searchValue} />}
          />
          <Route path="/add" element={<AddRecipePage onAddRecipe={handleAddRecipe} />} />
        </Routes>
      </Router>
    );
  };

  export default App;
