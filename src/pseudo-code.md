Recipe Preserve

Goal: be able to track recipes I'm working on under "attempts"

Data structure: {
  recipeKey: 
  {
    recipeName: STRING,
    image: STRING,
    attemps: [
      randomKey: 
      {
        date: STRING,
        ingredients: STRING,
        instructions: STRING,
        tastingNotes: STRING,
        bestSoFar: BOOLEAN
      }
    ]
  }
}

Design: https://jamboard.google.com/d/1entGyrI89lrf2EWwb9BPm2ZrkOTZC7P_ECduiiGGVuw/viewer?f=0

Routes:

/
Homepage (Jamboard page 1)

/recipeKey
Recipe page (Jamboard page 2)

State:
Homepage
- Recipes
  - Loop through objects on top level, build an array and display recipeName and image, create links to Recipe pages
  - ShowForm boolean
  - newRecipeName and newRecipeImage (to control form)

- Recipe
  - get randomKey from URL and store that recipe in state
    - using .recipeName on page
    - Loop through .attemps and display on page
  - ShowForm boolean
  - newAttemptIngredients, newAttemptInstructions, newAttemptTastingNotes, newAttemptBestSoFar



Pseudo-code:
/ 
On page load
  - get recipes from Firebase (onValue)
  - display on page (recipeName, image)
  - recipe cards are links bringing you to a /recipeKey page 
When "create new recipe" is clicked
  - reveal the form (showForm boolean is toggled)
When form is submitted
  - access newRecipeName and newRecipeURL states, create object, push() to Firebase database
On click of "cancel"
  - reset form
  - hide form (toggle showForm boolean)
On click of recipe card
  - go to /recipeKey page

/recipeKey
On page load
  - using React Router get recipeKey from URL
  - use that key to access a Firebase endpoint
  - display recipeName
  - loop through attempts to display on page
    - add a "displayed" boolean to each (defaults to false)
  - attempts are hidden through accordian (which use the "displayed" state). 
On click of attempt
  - reveal/hide the details of that attempt (toggle "displayed")
On click of "best so far" checkbox
  - loop through attemps to change bestSoFar boolean to false
  - access this attempt's randomKey.bestSoFar and change to true
On click of New Attempt button
  - Show form (change showForm boolean to true)
On click of Cancel button
  - reset form
  - change showForm boolean to false
On form submit
  - get newAttempt states, bundle as object
    - if newAttemptBestSoFar === true, loop through existing recipes and change bestSoFar in all to false
  - push() to firebase database attempts array


Stretch goals:
- Edit/delete options