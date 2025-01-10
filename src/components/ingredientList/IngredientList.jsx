import styles from "./IngredientList.module.css";

export default function IngredientList({ ingredient }) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={
            `https://spoonacular.com/cdn/ingredients_100x100/` +
            ingredient.image
          }
          alt="recipe"
        />
      </div>

      <div className={styles.nameContainer}>
        <div className={styles.name}>{ingredient.name}</div>

        <div className={styles.amount}>
          <p>
            {ingredient.amount} {ingredient.unit}
          </p>
        </div>
      </div>
    </div>
  );
}
