import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase.js';

const Recipe = function() {
    const { recipeKey } = useParams();
    const [ currentRecipe, setCurrentRecipe ] = useState({attempts: []});
    const [attemptDateChange, setAttemptDateChange] = useState('');
    const [attemptIngredientsChange, setAttemptIngredientsChange] = useState('');
    const [attemptInstructionsChange, setAttemptInstructionsChange] = useState('');
    const [attemptTastingNotesChange, setAttemptTastingNotesChange] = useState('');
    const [attemptBestSoFar, setAttemptBestSoFarChange] = useState(false);

    const handleAttemptDateChange = (e) => {
        setAttemptDateChange(e.target.value);
    };
    const handleAttemptIngredientsChange = (e) => {
        setAttemptIngredientsChange(e.target.value);
    };
    const handleAttemptInstructionsChange = (e) => {
        setAttemptInstructionsChange(e.target.value);
    };
    const handleAttemptTastingNotesChange = (e) => {
        setAttemptTastingNotesChange(e.target.value);
    };
    const handleAttemptBestSoFarChange = (e) => {
        setAttemptBestSoFarChange(!attemptBestSoFar);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newAttempt = {
            date: attemptDateChange,
            ingredients: attemptIngredientsChange,
            instructions: attemptInstructionsChange,
            tastingNotes: attemptTastingNotesChange,
            bestSoFar: attemptBestSoFar
        };
        // get database and create a ref
        const database = getDatabase(firebase);
        const recipeRef = ref(database, `${recipeKey}/attempts`);
        push(recipeRef, newAttempt);
        // clear inputs
        setAttemptDateChange('');
        setAttemptIngredientsChange('');
        setAttemptInstructionsChange('');
        setAttemptTastingNotesChange('');
        setAttemptBestSoFarChange(false);
    }
    
    useEffect( () => {
        // get database and create a ref
        const database = getDatabase(firebase);
        const recipeRef = ref(database, recipeKey);
        // set things to do on value change
        onValue(recipeRef, (res) => {
            const data = res.val();
            const recipeToSet = {
                recipeKey: recipeKey,
                recipeName: data.recipeName,
                image: data.image,
                attempts: []
            }

            for (const property in data.attempts) {
                recipeToSet.attempts.push(
                    data.attempts[property]
                );
            }

            setCurrentRecipe(recipeToSet);
        })
    }, [recipeKey]);

    return (
        <main>
            <Link to="/">Home</Link>
            <p>{currentRecipe.recipeName}</p>
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="attemptDate">Date</label>
                    <input type="text" id="attemptDate" name="attemptDate" value={attemptDateChange} onChange={handleAttemptDateChange} />
                    <label htmlFor="attemptIngredients">Ingredients</label>
                    <input type="text" id="attemptIngredients" name="attemptIngredients" value={attemptIngredientsChange} onChange={handleAttemptIngredientsChange} />
                    <label htmlFor="attemptInstructions">Instructions</label>
                    <input type="text" id="attemptInstructions" name="attemptInstructions" value={attemptInstructionsChange} onChange={handleAttemptInstructionsChange} />
                    <label htmlFor="attemptTastingNotes">Tasting Notes</label>
                    <input type="text" id="attemptTastingNotes" name="attemptTastingNotes" value={attemptTastingNotesChange} onChange={handleAttemptTastingNotesChange} />
                    <label htmlFor="attemptBestSoFar">Best So Far?</label>
                    <input type="checkbox" id="attemptBestSoFar" name="attemptBestSoFar" value={attemptBestSoFar} onChange={handleAttemptBestSoFarChange} />
                    <button type="submit">Submit</button>
                </form>
            </section>
            <section>
                <h2>Attempts</h2>
                <ul>
                    {
                        currentRecipe.attempts.map( (attempt) => {
                            return (
                                <li key={attempt.key}>
                                    <h3>{attempt.date}</h3>
                                    <h4>Ingredients</h4>
                                    <p>{attempt.ingredients}</p>
                                    <h4>Instructions</h4>
                                    <p>{attempt.instructions}</p>
                                    <h4>Tasting notes</h4>
                                    <p>{attempt.tastingNotes}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    )
}

export default Recipe;