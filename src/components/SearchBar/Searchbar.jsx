import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

export default function ({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");

  const URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = "1182711e8549465494248b6991f6c6b6";

  useEffect(() => {
    async function getFoodData() {
      let res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY} `);
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
