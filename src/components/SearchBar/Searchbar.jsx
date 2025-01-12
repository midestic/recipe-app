import { useEffect, useState } from "react";
import styles from "./Searchbar.module.css";

export default function Searchbar({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");

  const URL = "https://api.spoonacular.com/recipes/complexSearch";
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    async function getFoodData() {
      let res = await fetch(`${URL}?query=${query}&apiKey=${apiKey}`);
      let data = await res.json();

      setFoodData(data.results);
    }
    getFoodData();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className={styles.inputbar}
        value={query}
      />
    </div>
  );
}
