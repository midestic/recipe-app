import { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";
import IngredientMap from "../IngredientMap/IngredientMap";

export default function FoodDetails({ foodId }) {
  let [details, setDetails] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function getDetails() {
      try {
        let res = await fetch(`${URL}?apiKey=${apiKey}`);
        let data = await res.json();

        console.log("API Response: ", data);

        setDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details: ", error);
        setIsLoading(false);
      }
    }
    getDetails();
  }, [foodId]);

  return (
    <div className={styles.FoodDetails}>
      <h1 className={styles.recipeName}>{details.title || "Recipe Details"}</h1>
      <div className={styles.recipeCard}>
        <img
          src={details.image || "/placeholder-image.jpg"}
          className={styles.recipeImage}
          alt="food-recipe"
        />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚ {details.readyInMinutes || "N/A"} Minutes</strong>
          </span>
          <strong> 👨‍👩‍👧 Serves {details.servings || "N/A"} </strong>
          <span>
            {details.vegetarian ? " 🥕Vegetarian" : " 🍖 Non-Vegetarian"}
          </span>
          <span> {details.vegan ? "🐄  Vegan" : ""}</span>
        </div>
        <div className={styles.details}>
          <span>
            <b> 💲{details.pricePerServing / 100 || "N/A"} Per Serving</b>
          </span>
        </div>
      </div>
      <h2>Ingredients</h2>
      <IngredientMap details={details} isLoading={isLoading} />
      <div>
        <h2>Instructions</h2>
        <ol>
          {isLoading ? (
            <p>Loading......</p>
          ) : details.analyzedInstructions &&
            details.analyzedInstructions.length > 0 &&
            details.analyzedInstructions[0].steps ? (
            details.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))
          ) : (
            <p>Instructions are not available for this recipe.</p>
          )}
        </ol>
      </div>
    </div>
  );
}
