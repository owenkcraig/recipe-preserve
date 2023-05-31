import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from "./firebase";
import Header from './Header';
import { Link } from 'react-router-dom';

function Homepage () {

    const [recipes, setRecipes] = useState([]);
    const [newRecipeName, setNewRecipeName] = useState('');
    const [newRecipeImage, setNewRecipeImage] = useState('');

    const handleNewRecipeNameChange = (e) => {
        setNewRecipeName(e.target.value);
    };
    const handleNewRecipeImageChange = (e) => {
        setNewRecipeImage(e.target.value);
    };

    const handleNewRecipeSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            recipeName: newRecipeName,
            image: newRecipeImage
        }
        // get database and create a ref
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        push(dbRef, newRecipe);
        // clear inputs
        setNewRecipeName('');
        setNewRecipeImage('');
    };

    useEffect( () => {
        // get database and create a ref
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        // set things to do on value change
        onValue(dbRef, (res) => {
            const recipeArray = [];
            const data = res.val();
            for (const property in data) {
                data[property]['recipeKey'] = property;
                recipeArray.push(
                    {
                        recipeName: data[property].recipeName,
                        image: data[property].image,
                        key: property
                    }
                );
            }
            setRecipes(recipeArray);
        })
    }, []);

    return (
        <>
            <div className = 'recipeForm'>
                <form onSubmit={handleNewRecipeSubmit}>
                    <label htmlFor="newRecipeName">Name</label>
                    <input type="text" id="newRecipeName" name="newRecipeName" onChange={handleNewRecipeNameChange} value={newRecipeName} />
                    <label htmlFor="newRecipeImage">Image URL</label>
                    <input type="text" id="newRecipeImage" name="newRecipeImage" onChange={handleNewRecipeImageChange} value={newRecipeImage} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className='recipesDisplay'>
                <ul>
                    { recipes.map( (recipe) => {
                        return(
                            <Link to={`/${recipe.key}`} key={recipe.key}>
                                <li>
                                    <h2>{recipe.recipeName}</h2>
                                    <img src={recipe.image} alt={recipe.recipeName} />
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Homepage;