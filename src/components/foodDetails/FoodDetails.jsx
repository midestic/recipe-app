import { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";
import IngredientMap from "../IngredientMap/IngredientMap";

export default function FoodDetails({ foodId }) {
  let [details, setDetails] = useState({
    title: "",
    image: "",
    readyInMinutes: 0,
    servings: 0,
    vegetarian: false,
    vegan: false,
    pricePerServing: 0,
    analyzedInstructions: [{ steps: [] }],
  });
  let [isLoading, setIsLoading] = useState(true);

  let URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function getDetails() {
      try {
        let res = await fetch(`${URL}?apiKey=${apiKey}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();
        console.log(data);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [foodId]);

  return (
    <div className={styles.FoodDetails}>
      <h1 className={styles.recipeName}>{details.title}</h1>
      <div className={styles.recipeCard}>
        <img
          src={details.image}
          className={styles.recipeImage}
          alt="food-recipe"
        />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚ {details.readyInMinutes} Minutes</strong>
          </span>
          <strong> 👨‍👩‍👧 Serves {details.servings} </strong>
          <span>
            {details.vegetarian ? " 🥕Vegetarian" : " 🍖 Non-Vegetarian"}
          </span>
          <span> {details.vegan ? "🐄 Vegan" : ""}</span>
        </div>
        <div className={styles.details}>
          <span>
            <b>
              {" "}
              💲
              {details.pricePerServing
                ? (details.pricePerServing / 100).toFixed(2)
                : "N/A"}{" "}
              Per Serving
            </b>
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
          ) : details.analyzedInstructions?.[0]?.steps?.length ? (
            details.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))
          ) : (
            <p>No instructions available.</p>
          )}
        </ol>
      </div>
    </div>
  );
}
